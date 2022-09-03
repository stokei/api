import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { CreateCheckoutSessionCommand } from '@/commands/implements/checkouts/create-checkout-session.command';
import { CreateCheckoutSessionPriceDTO } from '@/dtos/checkouts/create-checkout-session.dto';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PricesNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { AppModel } from '@/models/app.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentSubscriptionPlanService } from '@/services/apps/find-app-current-subscription-plan';
import { FindAllDomainsService } from '@/services/domains/find-all-domains';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { CreateStripeCheckoutSessionService } from '@/services/stripe/create-stripe-checkout-session';
import { mountCheckoutCallbackURL } from '@/utils/mount-checkout-callback-url';

type CreateCheckoutSessionCommandKeys = keyof CreateCheckoutSessionCommand;

@CommandHandler(CreateCheckoutSessionCommand)
export class CreateCheckoutSessionCommandHandler
  implements ICommandHandler<CreateCheckoutSessionCommand>
{
  constructor(
    private readonly createStripeCheckoutSessionService: CreateStripeCheckoutSessionService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAppCurrentSubscriptionPlanService: FindAppCurrentSubscriptionPlanService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly findAllDomainsService: FindAllDomainsService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: CreateCheckoutSessionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreateCheckoutSessionCommandKeys>(
        'customer'
      );
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateCheckoutSessionCommandKeys>('app');
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreateCheckoutSessionCommandKeys>(
        'createdBy'
      );
    }
    if (!data?.prices?.length) {
      throw new ParamNotFoundException<CreateCheckoutSessionCommandKeys>(
        'prices'
      );
    }

    const app = await this.findAppByIdService.execute(data?.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const appCurrentSubscriptionPlan =
      await this.findAppCurrentSubscriptionPlanService.execute(app.id);
    const appPlan = appCurrentSubscriptionPlan?.plan;

    const { stripeCustomer, customerEmail } = await this.getCustomer({
      customer: data.customer,
      app
    });

    const appDomains = await this.findAllDomainsService.execute({
      where: {
        AND: {
          app: {
            equals: app.id
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
    const currentAppDomain =
      appDomains?.items?.length > 0 && appDomains?.items[0];

    const stripePrices = await this.getStripePrices(data.prices);

    const checkoutSession =
      await this.createStripeCheckoutSessionService.execute({
        app: app.id,
        applicationFeePercentage: appPlan?.applicationFeePercentage,
        currency: app.currency,
        prices: stripePrices,
        successUrl: mountCheckoutCallbackURL({
          success: true,
          domain: currentAppDomain?.name
        }),
        cancelUrl: mountCheckoutCallbackURL({
          success: false,
          domain: currentAppDomain?.name
        }),
        customer: stripeCustomer,
        customerEmail,
        stripeAccount: app.stripeAccount
      });
    return new CheckoutMapper().toModel(checkoutSession);
  }

  private clearData(
    command: CreateCheckoutSessionCommand
  ): CreateCheckoutSessionCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      customer: cleanValue(command?.customer),
      prices: command?.prices?.map((price) =>
        cleanObject({
          price: price.price,
          quantity: price.quantity
        })
      )
    });
  }

  private async getStripePrices(
    checkoutPrices: CreateCheckoutSessionPriceDTO[]
  ) {
    const pricesIds = checkoutPrices.map(
      (checkoutPrice) => checkoutPrice.price
    );
    const prices = await this.findAllPricesService.execute({
      where: {
        AND: {
          ids: pricesIds
        }
      }
    });
    if (!prices?.items?.length) {
      throw new PricesNotFoundException();
    }
    const stripePrices = checkoutPrices.map((checkoutPrice) => {
      const currentPrice = prices.items.find(
        (price) => checkoutPrice.price === price.id
      );
      return {
        ...checkoutPrice,
        price: currentPrice.stripePrice
      };
    });
    return stripePrices;
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
