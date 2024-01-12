import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentMethodCardCommand } from '@/commands/implements/payment-methods/create-payment-method-card.command';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  PaymentMethodAlreadyExistsException,
  PaymentMethodNotFoundException
} from '@/errors';
import { CreatePaymentMethodCardRepository } from '@/repositories/payment-methods/create-payment-method-card';
import { ExistsPaymentMethodsRepository } from '@/repositories/payment-methods/exists-payment-methods';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@CommandHandler(CreatePaymentMethodCardCommand)
export class CreatePaymentMethodCardCommandHandler
  implements ICommandHandler<CreatePaymentMethodCardCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createPaymentMethodRepository: CreatePaymentMethodCardRepository,
    private readonly existsPaymentMethodsRepository: ExistsPaymentMethodsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentMethodCardCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    let paymentMethodExists = false;
    if (data.parent) {
      paymentMethodExists = await this.existsPaymentMethodsRepository.execute({
        where: {
          parent: data.parent,
          app: app.id,
          lastFourCardNumber: data.lastFourCardNumber,
          cardBrand: data.cardBrand,
          cardExpiryMonth: data.cardExpiryMonth,
          cardExpiryYear: data.cardExpiryYear,
          paymentMethodType: PaymentMethodType.CARD,
          ...(data.stripePaymentMethod && {
            stripePaymentMethod: data.stripePaymentMethod
          })
        }
      });
    }
    if (paymentMethodExists) {
      throw new PaymentMethodAlreadyExistsException();
    }

    const paymentMethodCreated =
      await this.createPaymentMethodRepository.execute({
        ...data,
        paymentMethodType: PaymentMethodType.CARD
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
    command: CreatePaymentMethodCardCommand
  ): CreatePaymentMethodCardCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      stripePaymentMethod: cleanValue(command?.stripePaymentMethod),
      referenceId: cleanValue(command?.referenceId),
      lastFourCardNumber: cleanValue(command?.lastFourCardNumber),
      cardBrand: cleanValue(command?.cardBrand),
      cardExpiryMonth: cleanValue(command?.cardExpiryMonth),
      cardExpiryYear: cleanValue(command?.cardExpiryYear),
      parent: cleanValue(command?.parent)
    });
  }
}
