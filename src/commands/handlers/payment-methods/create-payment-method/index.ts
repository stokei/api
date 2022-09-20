import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentMethodCommand } from '@/commands/implements/payment-methods/create-payment-method.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { CreatePaymentMethodRepository } from '@/repositories/payment-methods/create-payment-method';
import { FindStripePaymentMethodByIdService } from '@/services/stripe/find-payment-method-by-id';

type CreatePaymentMethodCommandKeys = keyof CreatePaymentMethodCommand;

@CommandHandler(CreatePaymentMethodCommand)
export class CreatePaymentMethodCommandHandler
  implements ICommandHandler<CreatePaymentMethodCommand>
{
  constructor(
    private readonly createPaymentMethodRepository: CreatePaymentMethodRepository,
    private readonly findStripePaymentMethodByIdService: FindStripePaymentMethodByIdService,
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
    if (!data?.stripePaymentMethod) {
      throw new ParamNotFoundException<CreatePaymentMethodCommandKeys>(
        'stripePaymentMethod'
      );
    }
    const stripePaymentMethod =
      await this.findStripePaymentMethodByIdService.execute(
        data.stripePaymentMethod
      );
    if (!stripePaymentMethod) {
      throw new PaymentMethodNotFoundException();
    }

    const paymentMethodCreated =
      await this.createPaymentMethodRepository.execute({
        ...data,
        lastFourCardNumber: stripePaymentMethod.card?.last4,
        cardBrand: stripePaymentMethod.card?.brand
      });
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
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      stripePaymentMethod: cleanValue(command?.stripePaymentMethod),
      parent: cleanValue(command?.parent)
    });
  }
}
