import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { CreateCustomerPortalSessionCommand } from '@/commands/implements/customer-portal-sessions/create-customer-portal-session.command';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CustomerPortalSessionMapper } from '@/mappers/customer-portal-sessions';
import { AppModel } from '@/models/app.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateStripeCustomerPortalSessionService } from '@/services/stripe/create-stripe-customer-portal-session';

type CreateCustomerPortalSessionCommandKeys =
  keyof CreateCustomerPortalSessionCommand;

@CommandHandler(CreateCustomerPortalSessionCommand)
export class CreateCustomerPortalSessionCommandHandler
  implements ICommandHandler<CreateCustomerPortalSessionCommand>
{
  constructor(
    private readonly createStripeCustomerPortalSessionService: CreateStripeCustomerPortalSessionService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: CreateCustomerPortalSessionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreateCustomerPortalSessionCommandKeys>(
        'customer'
      );
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateCustomerPortalSessionCommandKeys>(
        'app'
      );
    }
    if (!data?.returnUrl) {
      throw new ParamNotFoundException<CreateCustomerPortalSessionCommandKeys>(
        'returnUrl'
      );
    }

    const app = await this.findAppByIdService.execute(data?.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const { stripeCustomer } = await this.getCustomer({
      customer: data.customer,
      app
    });

    const customerPortalSession =
      await this.createStripeCustomerPortalSessionService.execute({
        returnUrl: data.returnUrl,
        customer: stripeCustomer,
        stripeAccount: app.stripeAccount
      });
    return new CustomerPortalSessionMapper().toModel(customerPortalSession);
  }

  private clearData(
    command: CreateCustomerPortalSessionCommand
  ): CreateCustomerPortalSessionCommand {
    return cleanObject({
      returnUrl: cleanValue(command?.returnUrl),
      customer: cleanValue(command?.customer),
      app: cleanValue(command?.app)
    });
  }

  private async getCustomer(data: {
    customer: string;
    app: AppModel;
  }): Promise<{ stripeCustomer: string }> {
    const customerIsTheCurrentApp = data.customer === data.app.id;

    const handlers = {
      [ServerStokeiApiIdPrefix.ACCOUNTS]: async () => {
        const { stripeCustomer } = await this.findAccountByIdService.execute(
          data.customer
        );
        return { stripeCustomer };
      },
      [ServerStokeiApiIdPrefix.APPS]: async () => {
        const { stripeCustomer } = customerIsTheCurrentApp
          ? data.app
          : await this.findAppByIdService.execute(data.customer);
        return { stripeCustomer };
      }
    };

    const customerType = splitServiceId(data.customer)?.service;
    return handlers[customerType]() || handlers.accounts();
  }
}
