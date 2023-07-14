import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppStripeResourcesCommand } from '@/commands/implements/apps/create-app-stripe-resources.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AccountModel } from '@/models/account.model';
import { AppModel } from '@/models/app.model';
import { CreateAccountStripeCustomerService } from '@/services/accounts/create-account-stripe-customer';
import { FindAllAccountsService } from '@/services/accounts/find-all-accounts';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

type CreateAppStripeResourcesCommandKeys =
  keyof CreateAppStripeResourcesCommand;

@CommandHandler(CreateAppStripeResourcesCommand)
export class CreateAppStripeResourcesCommandHandler
  implements ICommandHandler<CreateAppStripeResourcesCommand>
{
  private readonly logger = new Logger(
    CreateAppStripeResourcesCommandHandler.name
  );
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAllAccountsService: FindAllAccountsService,
    private readonly createAccountStripeCustomerService: CreateAccountStripeCustomerService
  ) {}

  async execute(command: CreateAppStripeResourcesCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }

      if (!data?.app) {
        throw new ParamNotFoundException<CreateAppStripeResourcesCommandKeys>(
          'app'
        );
      }

      const app = await this.findAppByIdService.execute(data.app);
      if (!app) {
        throw new AppNotFoundException();
      }

      const allAccounts = await this.getAllAccounts({ app });
      for await (const account of allAccounts) {
        try {
          if (!!account.stripeCustomer) {
            continue;
          }
          await this.createAccountStripeCustomerService.execute({
            account: account.id,
            app: app.id,
            createdBy: app.parent
          });
          await new Promise((resolve) => setTimeout(resolve, 300));
        } catch (error) {
          this.logger.error(`App(#${data?.app}): ${error?.message}`);
        }
      }
      return allAccounts;
    } catch (error) {
      this.logger.error(`App(#${data?.app}): ${error?.message}`);
      return;
    }
  }

  private clearData(
    command: CreateAppStripeResourcesCommand
  ): CreateAppStripeResourcesCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }

  private async getAllAccounts({ app }: { app?: AppModel }) {
    let accounts: AccountModel[] = [];
    let hasNextPage = true;
    while (!!hasNextPage) {
      const currentAccounts = await this.findAllAccountsService.execute({
        where: {
          AND: {
            app: {
              equals: app.id
            }
          }
        }
      });
      accounts = [...accounts, ...currentAccounts.items];
      hasNextPage = !!currentAccounts.hasNextPage;
    }
    const allAccountsWithoutAccountsWithStripeCustomerCreated = accounts.filter(
      (account) => !account.stripeCustomer
    );
    return allAccountsWithoutAccountsWithStripeCustomerCreated;
  }
}
