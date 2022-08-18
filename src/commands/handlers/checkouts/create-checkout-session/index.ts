import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCheckoutSessionCommand } from '@/commands/implements/checkouts/create-checkout-session.command';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllDomainsService } from '@/services/domains/find-all-domains';
import { CreateStripeCheckoutSessionService } from '@/services/stripe/create-stripe-checkout-session';
import { mountCheckoutResponseURL } from '@/utils/mount-checkout-response-url';

type CreateCheckoutSessionCommandKeys = keyof CreateCheckoutSessionCommand;

@CommandHandler(CreateCheckoutSessionCommand)
export class CreateCheckoutSessionCommandHandler
  implements ICommandHandler<CreateCheckoutSessionCommand>
{
  constructor(
    private readonly createStripeCheckoutSessionService: CreateStripeCheckoutSessionService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAllDomainsService: FindAllDomainsService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: CreateCheckoutSessionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.account) {
      throw new ParamNotFoundException<CreateCheckoutSessionCommandKeys>(
        'account'
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

    const account = await this.findAccountByIdService.execute(data?.account);
    if (!account) {
      throw new AccountNotFoundException();
    }
    const app = await this.findAppByIdService.execute(data?.app);
    if (!app) {
      throw new AppNotFoundException();
    }

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

    const checkoutSession =
      await this.createStripeCheckoutSessionService.execute({
        app: app.id,
        currency: app.currency,
        prices: data.prices,
        successUrl: mountCheckoutResponseURL({
          success: true,
          domain: currentAppDomain?.name
        }),
        cancelUrl: mountCheckoutResponseURL({
          success: false,
          domain: currentAppDomain?.name
        }),
        customer: account.stripeCustomer,
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
      account: cleanValue(command?.account),
      prices: command?.prices?.map((price) =>
        cleanObject({
          price: price.price,
          quantity: price.quantity
        })
      )
    });
  }
}
