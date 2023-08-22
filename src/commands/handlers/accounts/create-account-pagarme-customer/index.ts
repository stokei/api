import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAccountPagarmeCustomerCommand } from '@/commands/implements/accounts/create-account-pagarme-customer.command';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PhoneNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { UpdateAccountService } from '@/services/accounts/update-account';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreatePagarmeCustomerService } from '@/services/pagarme/create-pagarme-customer';
import { CreatePhoneService } from '@/services/phones/create-phone';

type CreateAccountPagarmeCustomerCommandKeys =
  keyof CreateAccountPagarmeCustomerCommand;

@CommandHandler(CreateAccountPagarmeCustomerCommand)
export class CreateAccountPagarmeCustomerCommandHandler
  implements ICommandHandler<CreateAccountPagarmeCustomerCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createPagarmeCustomerService: CreatePagarmeCustomerService,
    private readonly createPhoneService: CreatePhoneService,
    private readonly updateAccountService: UpdateAccountService
  ) {}

  async execute(command: CreateAccountPagarmeCustomerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.account) {
      throw new ParamNotFoundException<CreateAccountPagarmeCustomerCommandKeys>(
        'account'
      );
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAccountPagarmeCustomerCommandKeys>(
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
    const phone = await this.createPhoneService.execute(data.phone);
    if (!phone) {
      throw new PhoneNotFoundException();
    }

    const customer = await this.createPagarmeCustomerService.execute({
      account: account.id,
      name: account.fullname,
      email: account.email,
      dateBirthday: data.dateBirthday,
      cpf: data.cpf,
      phone
    });
    if (!customer) {
      throw new AccountNotFoundException();
    }
    const updated = await this.updateAccountService.execute({
      data: {
        pagarmeCustomer: customer.id,
        dateBirthday: data.dateBirthday,
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
    command: CreateAccountPagarmeCustomerCommand
  ): CreateAccountPagarmeCustomerCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      cpf: cleanValue(command?.cpf),
      dateBirthday: cleanValue(command?.dateBirthday),
      phone: command?.phone,
      account: cleanValue(command?.account)
    });
  }
}
