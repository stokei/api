import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePaymentMethodCommand } from '@/commands/implements/payment-methods/update-payment-method.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { FindPaymentMethodByIdRepository } from '@/repositories/payment-methods/find-payment-method-by-id';
import { UpdatePaymentMethodRepository } from '@/repositories/payment-methods/update-payment-method';

type UpdatePaymentMethodCommandKeys = keyof UpdatePaymentMethodCommand;

@CommandHandler(UpdatePaymentMethodCommand)
export class UpdatePaymentMethodCommandHandler
  implements ICommandHandler<UpdatePaymentMethodCommand>
{
  constructor(
    private readonly findPaymentMethodByIdRepository: FindPaymentMethodByIdRepository,
    private readonly updatePaymentMethodRepository: UpdatePaymentMethodRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePaymentMethodCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const paymentMethodId = splitServiceId(data.where?.paymentMethodId)?.id;
    if (!paymentMethodId) {
      throw new ParamNotFoundException('paymentMethodId');
    }

    const paymentMethod = await this.findPaymentMethodByIdRepository.execute(
      paymentMethodId
    );
    if (!paymentMethod) {
      throw new PaymentMethodNotFoundException();
    }

    const updated = await this.updatePaymentMethodRepository.execute({
      ...data,
      where: {
        ...data.where,
        paymentMethodId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const paymentMethodUpdated =
      await this.findPaymentMethodByIdRepository.execute(paymentMethodId);
    if (!paymentMethodUpdated) {
      throw new PaymentMethodNotFoundException();
    }
    const paymentMethodModel =
      this.publisher.mergeObjectContext(paymentMethodUpdated);
    paymentMethodModel.updatedPaymentMethod({
      updatedBy: data.data.updatedBy
    });
    paymentMethodModel.commit();

    return paymentMethodUpdated;
  }

  private clearData(
    command: UpdatePaymentMethodCommand
  ): UpdatePaymentMethodCommand {
    return cleanObject({
      where: cleanObject({
        paymentMethodId: cleanValue(command?.where?.paymentMethodId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
