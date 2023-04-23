import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString
} from '@stokei/nestjs';
import Stripe from 'stripe';

import { CreateCheckoutCommand } from '@/commands/implements/checkouts/create-checkout.command';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException,
  SubscriptionContractAlreadyActiveException,
  SubscriptionContractItemNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPaymentMethodByIdService } from '@/services/payment-methods/find-payment-method-by-id';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripeSubscriptionService } from '@/services/stripe/create-stripe-subscription';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

type CreateCheckoutCommandKeys = keyof CreateCheckoutCommand;

@CommandHandler(CreateCheckoutCommand)
export class CreateCheckoutCommandHandler
  implements ICommandHandler<CreateCheckoutCommand>
{
  constructor(
    private readonly createStripeSubscriptionService: CreateStripeSubscriptionService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findAllSubscriptionContractsService: FindAllSubscriptionContractsService,
    private readonly createSubscriptionContractItemService: CreateSubscriptionContractItemService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly findPaymentMethodByIdService: FindPaymentMethodByIdService,
    private readonly createSubscriptionContractService: CreateSubscriptionContractService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: CreateCheckoutCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('customer');
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('createdBy');
    }
    if (!data?.price) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('price');
    }

    const customer = await this.findAccountByIdService.execute(data.customer);
    if (!customer) {
      throw new AccountNotFoundException();
    }

    const customerApp = await this.findAppByIdService.execute(customer.app);
    if (!customerApp) {
      throw new AppNotFoundException();
    }

    const price = await this.findPriceByIdService.execute(data?.price);
    if (!price) {
      throw new PriceNotFoundException();
    }

    const paymentMethod = await this.findPaymentMethodByIdService.execute(
      data?.paymentMethod
    );
    if (!paymentMethod) {
      throw new PriceNotFoundException();
    }

    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const customerSubscriptionContracts =
      await this.findAllSubscriptionContractsService.execute({
        where: {
          AND: {
            parent: {
              equals: data.customer
            },
            active: {
              equals: true
            }
          }
        },
        page: {
          limit: 1
        }
      });

    const existsActiveSubscriptionContracts =
      customerSubscriptionContracts?.totalCount > 0;
    if (existsActiveSubscriptionContracts) {
      throw new SubscriptionContractAlreadyActiveException();
    }

    const stripeSubscription =
      await this.createStripeSubscriptionService.execute({
        app: customerApp.id,
        currency: customerApp.currency,
        paymentMethod: paymentMethod?.stripePaymentMethod,
        startPaymentWhenSubscriptionIsCreated: true,
        automaticRenew: true,
        prices: [{ price: price.stripePrice, quantity: 1 }],
        customer: customer.stripeCustomer,
        stripeAccount: customerApp.stripeAccount
      });
    if (!stripeSubscription) {
      throw new SubscriptionContractNotFoundException();
    }
    const subscriptionContract =
      await this.createSubscriptionContractService.execute({
        app: customerApp.id,
        createdBy: data.createdBy,
        parent: data.customer,
        paymentMethod: paymentMethod?.id,
        stripeSubscription: stripeSubscription.id,
        startAt: stripeSubscription.start_date
          ? convertToISODateString(stripeSubscription.start_date)
          : null,
        endAt: stripeSubscription.ended_at
          ? convertToISODateString(stripeSubscription.ended_at)
          : null,
        type: price.type,
        automaticRenew: true
      });
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    const subscriptionContractItem =
      await this.createSubscriptionContractItemService.execute({
        app: customerApp.id,
        product: product.parent,
        price: price.id,
        recurring: price.recurring,
        parent: subscriptionContract.id,
        quantity: 1,
        createdBy: data.createdBy,
        stripeSubscriptionItem: stripeSubscription.items.data[0].id
      });
    if (!subscriptionContractItem) {
      throw new SubscriptionContractItemNotFoundException();
    }
    return new CheckoutMapper().toModel({
      subscriptionContract,
      clientSecret: (
        (stripeSubscription.latest_invoice as Stripe.Invoice)
          .payment_intent as Stripe.PaymentIntent
      ).client_secret
    });
  }

  private clearData(command: CreateCheckoutCommand): CreateCheckoutCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      paymentMethod: cleanValue(command?.paymentMethod),
      customer: cleanValue(command?.customer),
      price: cleanValue(command?.price)
    });
  }
}
