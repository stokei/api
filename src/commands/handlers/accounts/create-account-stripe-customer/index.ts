import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAccountStripeCustomerCommand } from '@/commands/implements/accounts/create-account-stripe-customer.command';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { UpdateAccountService } from '@/services/accounts/update-account';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateStripeCustomerService } from '@/services/stripe/create-stripe-customer';

type CreateAccountStripeCustomerCommandKeys =
  keyof CreateAccountStripeCustomerCommand;

@CommandHandler(CreateAccountStripeCustomerCommand)
export class CreateAccountStripeCustomerCommandHandler
  implements ICommandHandler<CreateAccountStripeCustomerCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createStripeCustomerService: CreateStripeCustomerService,
    private readonly updateAccountService: UpdateAccountService
  ) {}

  async execute(command: CreateAccountStripeCustomerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.account) {
      throw new ParamNotFoundException<CreateAccountStripeCustomerCommandKeys>(
        'account'
      );
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAccountStripeCustomerCommandKeys>(
        'app'
      );
    }

    const account = await this.findAccountByIdService.execute(data.account);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const customer = await this.createStripeCustomerService.execute({
      name: account.fullname,
      email: account.email,
      parent: account.id,
      stripeAccount: app.stripeAccount
    });
    if (!customer) {
      throw new AccountNotFoundException();
    }
    const updated = await this.updateAccountService.execute({
      data: {
        stripeCustomer: customer.id,
        updatedBy: data.createdBy
      },
      where: {
        account: account.id,
        app: app.id
      }
    });
    return updated;
  }

  private clearData(
    command: CreateAccountStripeCustomerCommand
  ): CreateAccountStripeCustomerCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      account: cleanValue(command?.account)
    });
  }
}
