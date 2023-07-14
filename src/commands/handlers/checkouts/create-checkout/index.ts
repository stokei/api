import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

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
  SubscriptionContractNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { PriceModel } from '@/models/price.model';
import { ProductModel } from '@/models/product.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripeCheckoutSessionService } from '@/services/stripe/create-stripe-checkout-session';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';
import { getAppStokeiDomain } from '@/utils/get-app-stokei-domain';
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
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly createStripeCheckoutSessionService: CreateStripeCheckoutSessionService,
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

    const customerApp = await this.findAppByIdService.execute(data.app);
    if (!customerApp) {
      throw new AppNotFoundException();
    }
    let appDomainURL = '';
    const appDomain = await this.findAppCurrentDomainService.execute(
      customerApp.id
    );
    if (appDomain) {
      appDomainURL = appDomain.url;
    } else {
      appDomainURL = getAppStokeiDomain({ app: customerApp }).url;
    }
    const price = await this.findPriceByIdService.execute(data?.price);
    if (!price || !price.active || price.app !== data.app) {
      throw new PriceNotFoundException();
    }

    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const hasActivePrice = await this.hasSubscriptionActive({
      price,
      product,
      customer: customer?.id
    });
    if (hasActivePrice) {
      throw new SubscriptionContractAlreadyActiveException();
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

    return new CheckoutMapper().toModel({
      url: checkoutSession.url
    });
  }

  private async hasSubscriptionActive({
    customer,
    product,
    price
  }: {
    customer: string;
    product: ProductModel;
    price: PriceModel;
  }): Promise<boolean> {
    const customerSubscriptionContractItems =
      await this.findAllSubscriptionContractItemsService.execute({
        where: {
          AND: {
            createdBy: {
              equals: customer
            },
            product: {
              equals: product.parent
            },
            price: {
              equals: price.id
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

    if (customerSubscriptionContractItems?.totalCount > 0) {
      const subscriptionContracts = await Promise.all(
        customerSubscriptionContractItems?.items?.map(
          async (customerSubscriptionContractItem) => {
            try {
              const customerSubscriptionContract =
                await this.findSubscriptionContractByIdService.execute(
                  customerSubscriptionContractItem?.parent
                );
              return customerSubscriptionContract;
            } catch (error) {
              return null;
            }
          }
        )
      );
      return subscriptionContracts
        ?.filter(Boolean)
        ?.some((subscriptionContract) => !!subscriptionContract.active);
    }
    return false;
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
