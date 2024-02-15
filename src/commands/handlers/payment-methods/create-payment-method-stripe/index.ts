import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentMethodStripeCommand } from '@/commands/implements/payment-methods/create-payment-method-stripe.command';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { CreatePaymentMethodStripeRepository } from '@/repositories/payment-methods/create-payment-method-stripe';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

type CreatePaymentMethodStripeCommandKeys =
  keyof CreatePaymentMethodStripeCommand;

@CommandHandler(CreatePaymentMethodStripeCommand)
export class CreatePaymentMethodStripeCommandHandler
  implements ICommandHandler<CreatePaymentMethodStripeCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createPaymentMethodRepository: CreatePaymentMethodStripeRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentMethodStripeCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreatePaymentMethodStripeCommandKeys>(
        'app'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const paymentMethodCreated =
      await this.createPaymentMethodRepository.execute({
        ...data,
        paymentMethodType: PaymentMethodType.STRIPE
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
    command: CreatePaymentMethodStripeCommand
  ): CreatePaymentMethodStripeCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
