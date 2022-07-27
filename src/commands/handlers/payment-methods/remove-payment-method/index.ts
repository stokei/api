import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemovePaymentMethodCommand } from '@/commands/implements/payment-methods/remove-payment-method.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { FindPaymentMethodByIdRepository } from '@/repositories/payment-methods/find-payment-method-by-id';
import { RemovePaymentMethodRepository } from '@/repositories/payment-methods/remove-payment-method';

@CommandHandler(RemovePaymentMethodCommand)
export class RemovePaymentMethodCommandHandler
  implements ICommandHandler<RemovePaymentMethodCommand>
{
  constructor(
    private readonly findPaymentMethodByIdRepository: FindPaymentMethodByIdRepository,
    private readonly removePaymentMethodRepository: RemovePaymentMethodRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePaymentMethodCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const paymentMethodId = splitServiceId(data.where?.paymentMethod)?.id;
    if (!paymentMethodId) {
      throw new ParamNotFoundException('paymentMethodId');
    }

    const paymentMethod = await this.findPaymentMethodByIdRepository.execute(
      paymentMethodId
    );
    if (!paymentMethod) {
      throw new PaymentMethodNotFoundException();
    }

    const removed = await this.removePaymentMethodRepository.execute({
      where: {
        ...data.where,
        paymentMethod: paymentMethodId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const paymentMethodModel = this.publisher.mergeObjectContext(paymentMethod);
    paymentMethodModel.removedPaymentMethod({
      removedBy: data.where.removedBy
    });
    paymentMethodModel.commit();

    return paymentMethod;
  }

  private clearData(
    command: RemovePaymentMethodCommand
  ): RemovePaymentMethodCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        paymentMethod: cleanValue(command?.where?.paymentMethod)
      })
    });
  }
}
