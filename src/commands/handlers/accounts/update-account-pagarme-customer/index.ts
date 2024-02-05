import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, OrderBy } from '@stokei/nestjs';

import { UpdateAccountPagarmeCustomerCommand } from '@/commands/implements/accounts/update-account-pagarme-customer.command';
import { CreateDocumentDTO } from '@/dtos/documents/create-document.dto';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PhoneNotFoundException
} from '@/errors';
import { PhoneModel } from '@/models/phone.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { UpdateAccountService } from '@/services/accounts/update-account';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateOrUpdatePagarmeCustomerService } from '@/services/pagarme/create-or-update-pagarme-customer';
import { FindPagarmeCustomerByIdService } from '@/services/pagarme/find-pagarme-customer-by-id';
import { CreatePhoneService } from '@/services/phones/create-phone';
import { FindAllPhonesService } from '@/services/phones/find-all-phones';

type UpdateAccountPagarmeCustomerCommandKeys =
  keyof UpdateAccountPagarmeCustomerCommand;

@CommandHandler(UpdateAccountPagarmeCustomerCommand)
export class UpdateAccountPagarmeCustomerCommandHandler
  implements ICommandHandler<UpdateAccountPagarmeCustomerCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findPagarmeCustomerByIdService: FindPagarmeCustomerByIdService,
    private readonly createOrUpdatePagarmeCustomerService: CreateOrUpdatePagarmeCustomerService,
    private readonly createPhoneService: CreatePhoneService,
    private readonly findAllPhonesService: FindAllPhonesService,
    private readonly updateAccountService: UpdateAccountService
  ) {}

  async execute(command: UpdateAccountPagarmeCustomerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.account) {
      throw new ParamNotFoundException<UpdateAccountPagarmeCustomerCommandKeys>(
        'account'
      );
    }
    if (!data?.app) {
      throw new ParamNotFoundException<UpdateAccountPagarmeCustomerCommandKeys>(
        'app'
      );
    }

    const account = await this.findAccountByIdService.execute(data.account);
    if (!account?.pagarmeCustomer) {
      throw new AccountNotFoundException();
    }
    const pagarmeCustomer = await this.findPagarmeCustomerByIdService.execute(
      account.pagarmeCustomer
    );
    if (!pagarmeCustomer) {
      throw new AccountNotFoundException();
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    let phone: PhoneModel;
    try {
      if (data?.phone?.number) {
        phone = await this.createPhoneService.execute(data.phone);
      }
    } catch (error) {}

    if (!phone) {
      try {
        const phones = await this.findAllPhonesService.execute({
          where: {
            AND: {
              parent: {
                equals: account.id
              }
            }
          },
          orderBy: {
            createdAt: OrderBy.DESC
          },
          page: {
            limit: 1
          }
        });
        if (phones?.items?.length) {
          phone = phones?.items?.[0];
        }
      } catch (error) {}
    }
    if (!phone) {
      throw new PhoneNotFoundException();
    }

    const document: CreateDocumentDTO = data.document?.document
      ? data.document
      : {
          document: pagarmeCustomer?.document,
          type: pagarmeCustomer?.document_type
        };
    const customer = await this.createOrUpdatePagarmeCustomerService.execute({
      account: account.id,
      name: account.fullname,
      email: account.email,
      dateBirthday: data.dateBirthday || account.dateBirthday,
      document,
      phone
    });
    if (!customer) {
      throw new AccountNotFoundException();
    }
    const updated = await this.updateAccountService.execute({
      data: {
        pagarmeCustomer: customer.id,
        dateBirthday: data.dateBirthday,
        updatedBy: data.updatedBy
      },
      where: {
        account: account.id,
        app: app.id
      }
    });
    return updated;
  }

  private clearData(
    command: UpdateAccountPagarmeCustomerCommand
  ): UpdateAccountPagarmeCustomerCommand {
    return cleanObject({
      updatedBy: cleanValue(command?.updatedBy),
      app: cleanValue(command?.app),
      document: {
        document: cleanValue(command?.document?.document),
        type: cleanValue(command?.document?.type)
      },
      dateBirthday: cleanValue(command?.dateBirthday),
      phone: command?.phone,
      account: cleanValue(command?.account)
    });
  }
}
