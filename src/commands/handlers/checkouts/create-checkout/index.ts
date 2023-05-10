import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString
} from '@stokei/nestjs';
import Stripe from 'stripe';

import { CreateCheckoutCommand } from '@/commands/implements/checkouts/create-checkout.command';
import { APPLICATION_FEE_PERCENT } from '@/environments';
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
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripeCheckoutSessionService } from '@/services/stripe/create-stripe-checkout-session';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';
import { getDefaultAppDomain } from '@/utils/get-default-app-domain';
import { mountCheckoutCallbackURL } from '@/utils/mount-checkout-callback-url';

type CreateCheckoutCommandKeys = keyof CreateCheckoutCommand;

@CommandHandler(CreateCheckoutCommand)
export class CreateCheckoutCommandHandler
  implements ICommandHandler<CreateCheckoutCommand>
{
  constructor(
    private readonly findAppCurrentDomainService: FindAppCurrentDomainService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly createSubscriptionContractItemService: CreateSubscriptionContractItemService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly createStripeCheckoutSessionService: CreateStripeCheckoutSessionService,
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
    let appDomainURL = '';
    const appDomain = await this.findAppCurrentDomainService.execute(
      customerApp.id
    );
    if (appDomain) {
      appDomainURL = appDomain.name;
    } else {
      appDomainURL = getDefaultAppDomain({ appId: customerApp.id });
    }
    const price = await this.findPriceByIdService.execute(data?.price);
    if (!price) {
      throw new PriceNotFoundException();
    }

    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const customerSubscriptionContractItems =
      await this.findAllSubscriptionContractItemsService.execute({
        where: {
          AND: {
            product: {
              equals: product.parent
            },
            price: {
              equals: price.id
            }
          }
        },
        page: {
          limit: 1
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

    const customerCurrentSubscriptionContractItem =
      customerSubscriptionContractItems?.items?.[0];
    if (!!customerCurrentSubscriptionContractItem) {
      try {
        const customerSubscriptionContract =
          await this.findSubscriptionContractByIdService.execute(
            customerCurrentSubscriptionContractItem?.parent
          );
        if (!!customerSubscriptionContract.active) {
          throw new SubscriptionContractAlreadyActiveException();
        }
      } catch (e) {}
    }

    const cancelUrl = mountCheckoutCallbackURL({
      success: false,
      domain: appDomainURL,
      product: product.id
    });
    const successUrl = mountCheckoutCallbackURL({
      success: true,
      domain: appDomainURL,
      product: product.id
    });

    const checkoutSession =
      await this.createStripeCheckoutSessionService.execute({
        app: customerApp.id,
        currency: customerApp.currency,
        applicationFeePercentage: APPLICATION_FEE_PERCENT,
        cancelUrl,
        successUrl,
        customer: customer.stripeCustomer,
        stripeAccount: customerApp.stripeAccount,
        customerEmail: customer.email,
        customerReference: customer.id,
        prices: [{ price: price.stripePrice, quantity: 1 }]
      });
    if (!checkoutSession) {
      throw new SubscriptionContractNotFoundException();
    }

    const stripeSubscription: Stripe.Subscription =
      checkoutSession?.subscription as Stripe.Subscription;
    if (!stripeSubscription) {
      throw new SubscriptionContractNotFoundException();
    }

    const subscriptionContract =
      await this.createSubscriptionContractService.execute({
        app: customerApp.id,
        createdBy: data.createdBy,
        parent: data.customer,
        stripeSubscription: stripeSubscription?.id,
        createdByAdmin: false,
        startAt: stripeSubscription?.start_date
          ? convertToISODateString(stripeSubscription?.start_date)
          : null,
        endAt: stripeSubscription?.ended_at
          ? convertToISODateString(stripeSubscription?.ended_at)
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
        createdByAdmin: false,
        stripeSubscriptionItem: stripeSubscription.items.data[0].id
      });
    if (!subscriptionContractItem) {
      throw new SubscriptionContractItemNotFoundException();
    }

    return new CheckoutMapper().toModel({
      url: checkoutSession.url
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
}
