import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemovePaymentCommand } from '@/commands/implements/payments/remove-payment.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException
} from '@/errors';
import { FindPaymentByIdRepository } from '@/repositories/payments/find-payment-by-id';
import { RemovePaymentRepository } from '@/repositories/payments/remove-payment';

@CommandHandler(RemovePaymentCommand)
export class RemovePaymentCommandHandler
  implements ICommandHandler<RemovePaymentCommand>
{
  constructor(
    private readonly findPaymentByIdRepository: FindPaymentByIdRepository,
    private readonly removePaymentRepository: RemovePaymentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePaymentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const paymentId = splitServiceId(data.where?.payment)?.id;
    if (!paymentId) {
      throw new ParamNotFoundException('paymentId');
    }

    const payment = await this.findPaymentByIdRepository.execute(paymentId);
    if (!payment) {
      throw new PaymentNotFoundException();
    }

    const removed = await this.removePaymentRepository.execute({
      where: {
        ...data.where,
        payment: paymentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const paymentModel = this.publisher.mergeObjectContext(payment);
    paymentModel.removedPayment({
      removedBy: data.where.removedBy
    });
    paymentModel.commit();

    return payment;
  }

  private clearData(command: RemovePaymentCommand): RemovePaymentCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        payment: cleanValue(command?.where?.payment)
      })
    });
  }
}
