import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentMethodCommand } from '@/commands/implements/payment-methods/create-payment-method.command';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodAlreadyExistsException,
  PaymentMethodNotFoundException
} from '@/errors';
import { CreatePaymentMethodRepository } from '@/repositories/payment-methods/create-payment-method';
import { ExistsPaymentMethodsRepository } from '@/repositories/payment-methods/exists-payment-methods';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { AttachStripePaymentMethodToCustomerService } from '@/services/stripe/attach-stripe-payment-method-to-customer';
import { FindStripeCustomerByIdService } from '@/services/stripe/find-customer-by-id';
import { FindStripePaymentMethodByIdService } from '@/services/stripe/find-payment-method-by-id';

type CreatePaymentMethodCommandKeys = keyof CreatePaymentMethodCommand;

@CommandHandler(CreatePaymentMethodCommand)
export class CreatePaymentMethodCommandHandler
  implements ICommandHandler<CreatePaymentMethodCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createPaymentMethodRepository: CreatePaymentMethodRepository,
    private readonly existsPaymentMethodsRepository: ExistsPaymentMethodsRepository,
    private readonly findStripePaymentMethodByIdService: FindStripePaymentMethodByIdService,
    private readonly findStripeCustomerByIdService: FindStripeCustomerByIdService,
    private readonly attachStripePaymentMethodToCustomerService: AttachStripePaymentMethodToCustomerService,
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

    const account = await this.findAccountByIdService.execute(data.parent);
    if (!account) {
      throw new AccountNotFoundException();
    }
    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const stripePaymentMethod =
      await this.findStripePaymentMethodByIdService.execute(
        data.stripePaymentMethod,
        app.stripeAccount
      );
    if (!stripePaymentMethod) {
      throw new PaymentMethodNotFoundException();
    }
    const stripeCustomer = await this.findStripeCustomerByIdService.execute(
      account.stripeCustomer,
      app.stripeAccount
    );
    if (!stripeCustomer) {
      throw new AccountNotFoundException();
    }
    if (
      !!stripePaymentMethod?.customer &&
      stripePaymentMethod?.customer !== account.stripeCustomer
    ) {
      throw new PaymentMethodNotFoundException();
    }

    const lastFourCardNumber = stripePaymentMethod.card?.last4;
    const cardBrand = stripePaymentMethod.card?.brand;
    const cardExpiryMonth = stripePaymentMethod.card?.exp_month
      ? stripePaymentMethod.card.exp_month + ''
      : undefined;
    const cardExpiryYear = stripePaymentMethod.card?.exp_year
      ? stripePaymentMethod.card.exp_year + ''
      : undefined;

    const paymentMethodExists =
      await this.existsPaymentMethodsRepository.execute({
        where: {
          parent: account.id,
          app: app.id,
          lastFourCardNumber,
          cardBrand,
          cardExpiryMonth,
          cardExpiryYear,
          ...(data.stripePaymentMethod && {
            stripePaymentMethod: data.stripePaymentMethod
          })
        }
      });
    if (paymentMethodExists) {
      throw new PaymentMethodAlreadyExistsException();
    }

    await this.attachStripePaymentMethodToCustomerService.execute({
      app: app.id,
      customer: account?.stripeCustomer,
      paymentMethod: data.stripePaymentMethod,
      stripeAccount: app.stripeAccount
    });

    const paymentMethodCreated =
      await this.createPaymentMethodRepository.execute({
        ...data,
        lastFourCardNumber,
        cardBrand,
        cardExpiryMonth,
        cardExpiryYear
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
