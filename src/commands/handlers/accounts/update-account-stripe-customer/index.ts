import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { UpdateAccountStripeCustomerCommand } from '@/commands/implements/accounts/update-account-stripe-customer.command';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { UpdateStripeCustomerService } from '@/services/stripe/update-stripe-customer';

@CommandHandler(UpdateAccountStripeCustomerCommand)
export class UpdateAccountStripeCustomerCommandHandler
  implements ICommandHandler<UpdateAccountStripeCustomerCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly updateStripeCustomerService: UpdateStripeCustomerService
  ) {}

  async execute(command: UpdateAccountStripeCustomerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.account) {
      throw new ParamNotFoundException('account');
    }
    if (!data?.app) {
      throw new ParamNotFoundException('app');
    }

    const account = await this.findAccountByIdService.execute(data.account);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const customerUpdated = await this.updateStripeCustomerService.execute({
      data: {
        name: account.fullname,
        email: account.email
      },
      where: {
        stripeAccount: app.stripeAccount,
        stripeCustomer: account.stripeCustomer
      }
    });
    return !!customerUpdated;
  }

  private clearData(
    command: UpdateAccountStripeCustomerCommand
  ): UpdateAccountStripeCustomerCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      account: cleanValue(command?.account)
    });
  }
}
