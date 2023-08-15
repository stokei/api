import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePaymentCommand } from '@/commands/implements/payments/update-payment.command';
import {
  DataNotFoundException,
  PaymentNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindPaymentByIdRepository } from '@/repositories/payments/find-payment-by-id';
import { UpdatePaymentRepository } from '@/repositories/payments/update-payment';

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentCommandHandler
  implements ICommandHandler<UpdatePaymentCommand>
{
  constructor(
    private readonly findPaymentByIdRepository: FindPaymentByIdRepository,
    private readonly updatePaymentRepository: UpdatePaymentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePaymentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const paymentId = splitServiceId(data.where?.payment)?.id;
    if (!paymentId) {
      throw new ParamNotFoundException('paymentId');
    }

    const payment = await this.findPaymentByIdRepository.execute(paymentId);
    if (!payment) {
      throw new PaymentNotFoundException();
    }

    const updated = await this.updatePaymentRepository.execute({
      ...data,
      where: {
        ...data.where,
        payment: paymentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const paymentUpdated = await this.findPaymentByIdRepository.execute(
      paymentId
    );
    if (!paymentUpdated) {
      throw new PaymentNotFoundException();
    }
    const paymentModel = this.publisher.mergeObjectContext(paymentUpdated);
    paymentModel.updatedPayment({
      updatedBy: data.data.updatedBy
    });
    paymentModel.commit();

    return paymentUpdated;
  }

  private clearData(command: UpdatePaymentCommand): UpdatePaymentCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        payment: cleanValue(command?.where?.payment)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        description: cleanValue(command?.data?.description),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
