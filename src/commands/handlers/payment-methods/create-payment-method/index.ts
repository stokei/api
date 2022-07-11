import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentMethodCommand } from '@/commands/implements/payment-methods/create-payment-method.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { CreatePaymentMethodRepository } from '@/repositories/payment-methods/create-payment-method';

type CreatePaymentMethodCommandKeys = keyof CreatePaymentMethodCommand;

@CommandHandler(CreatePaymentMethodCommand)
export class CreatePaymentMethodCommandHandler
  implements ICommandHandler<CreatePaymentMethodCommand>
{
  constructor(
    private readonly createPaymentMethodRepository: CreatePaymentMethodRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentMethodCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePaymentMethodCommandKeys>(
        'parent'
      );
    }

    const paymentMethodCreated =
      await this.createPaymentMethodRepository.execute(data);
    if (!paymentMethodCreated) {
      throw new PaymentMethodNotFoundException();
    }
    const paymentMethodModel =
      this.publisher.mergeObjectContext(paymentMethodCreated);
    paymentMethodModel.createdPaymentMethod({
      createdBy: data.createdBy
    });
    paymentMethodModel.commit();

    return paymentMethodCreated;
  }

  private clearData(
    command: CreatePaymentMethodCommand
  ): CreatePaymentMethodCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
