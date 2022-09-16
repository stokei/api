import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';
import Stripe from 'stripe';

import { CreateCheckoutCommand } from '@/commands/implements/checkouts/create-checkout.command';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { AppModel } from '@/models/app.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentSubscriptionPlanService } from '@/services/apps/find-app-current-subscription-plan';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripeSubscriptionService } from '@/services/stripe/create-stripe-subscription';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';

type CreateCheckoutCommandKeys = keyof CreateCheckoutCommand;

@CommandHandler(CreateCheckoutCommand)
export class CreateCheckoutCommandHandler
  implements ICommandHandler<CreateCheckoutCommand>
{
  constructor(
    private readonly createStripeSubscriptionService: CreateStripeSubscriptionService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findAppCurrentSubscriptionPlanService: FindAppCurrentSubscriptionPlanService,
    private readonly findPriceByIdService: FindPriceByIdService,
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
    if (!data?.app) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('app');
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('createdBy');
    }
    if (!data?.price) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('price');
    }

    const app = await this.findAppByIdService.execute(data?.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const price = await this.findPriceByIdService.execute(data?.price);
    if (!price) {
      throw new PriceNotFoundException();
    }
    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const appCurrentSubscriptionPlan =
      await this.findAppCurrentSubscriptionPlanService.execute(app.id);
    const appPlan = appCurrentSubscriptionPlan?.plan;

    const { stripeCustomer } = await this.getCustomer({
      customer: data.customer,
      app
    });

    const stripeSubscription =
      await this.createStripeSubscriptionService.execute({
        app: app.id,
        applicationFeePercentage: appPlan?.applicationFeePercentage,
        currency: app.currency,
        price: price.stripePrice,
        customer: stripeCustomer,
        stripeAccount: app.stripeAccount
      });
    if (!stripeSubscription) {
      throw new SubscriptionContractNotFoundException();
    }
    const subscriptionContract =
      await this.createSubscriptionContractService.execute({
        app: price.app,
        createdBy: price.createdBy,
        parent: data.customer,
        product: product.parent,
        invoiceProduct: product.id,
        invoicePrice: price.id,
        stripeSubscription: stripeSubscription.id,
        type: price.type,
        automaticRenew: true,
        recurringIntervalCount: price.recurringIntervalCount,
        recurringIntervalType: price.recurringIntervalType
      });
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
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
      customer: cleanValue(command?.customer),
      price: cleanValue(command?.price)
    });
  }

  private async getCustomer(data: {
    customer: string;
    app: AppModel;
  }): Promise<{ stripeCustomer: string; customerEmail: string }> {
    const customerIsTheCurrentApp = data.customer === data.app.id;

    const handlers = {
      [ServerStokeiApiIdPrefix.ACCOUNTS]: async () => {
        const { stripeCustomer, email } =
          await this.findAccountByIdService.execute(data.customer);
        return { stripeCustomer, email };
      },
      [ServerStokeiApiIdPrefix.APPS]: async () => {
        const { stripeCustomer, email } = customerIsTheCurrentApp
          ? data.app
          : await this.findAppByIdService.execute(data.customer);
        return { stripeCustomer, email };
      }
    };

    const customerType = splitServiceId(data.customer)?.service;
    return handlers[customerType]() || handlers.accounts();
  }
}
