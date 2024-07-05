import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppPagarmeAccountCommand } from '@/commands/implements/apps/create-app-pagarme-account.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  PagarmeAccountAlreadyExistsException,
  PagarmeAccountNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { UpdateAppService } from '@/services/apps/update-app';
import { CreatePagarmeAccountService } from '@/services/pagarme/create-pagarme-account';

type CreateAppPagarmeAccountCommandKeys = keyof CreateAppPagarmeAccountCommand;

@CommandHandler(CreateAppPagarmeAccountCommand)
export class CreateAppPagarmeAccountCommandHandler
  implements ICommandHandler<CreateAppPagarmeAccountCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createPagarmeAccountService: CreatePagarmeAccountService,
    private readonly updateAppService: UpdateAppService
  ) {}

  async execute(command: CreateAppPagarmeAccountCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppPagarmeAccountCommandKeys>(
        'app'
      );
    }
    if (!data?.document) {
      throw new ParamNotFoundException<CreateAppPagarmeAccountCommandKeys>(
        'document'
      );
    }
    if (!data?.documentType) {
      throw new ParamNotFoundException<CreateAppPagarmeAccountCommandKeys>(
        'documentType'
      );
    }
    if (!data?.defaultBankAccount) {
      throw new ParamNotFoundException<CreateAppPagarmeAccountCommandKeys>(
        'defaultBankAccount'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    if (app.pagarmeAccount) {
      throw new PagarmeAccountAlreadyExistsException();
    }

    const pagarmeAccount = await this.createPagarmeAccountService.execute({
      app: app.id,
      name: app.name,
      email: app.email,
      defaultBankAccount: data.defaultBankAccount,
      document: data.document,
      documentType: data.documentType
    });
    if (!pagarmeAccount) {
      throw new PagarmeAccountNotFoundException();
    }
    const updated = await this.updateAppService.execute({
      data: {
        pagarmeAccount: pagarmeAccount.id,
        updatedBy: data.createdBy
      },
      where: {
        app: app.id
      }
    });
    if (!updated) {
      throw new AppNotFoundException();
    }
    return updated;
  }

  private clearData(
    command: CreateAppPagarmeAccountCommand
  ): CreateAppPagarmeAccountCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      document: cleanValue(command?.document),
      documentType: cleanValue(command?.documentType)?.toLowerCase(),
      createdBy: cleanValue(command?.createdBy),
      defaultBankAccount: command?.defaultBankAccount && {
        bankAccountType: cleanValue(
          command?.defaultBankAccount?.bankAccountType
        )?.toLowerCase(),
        holderType: cleanValue(
          command?.defaultBankAccount?.holderType
        )?.toLowerCase(),
        holderDocument: cleanValue(command?.defaultBankAccount?.holderDocument),
        accountNumber: cleanValue(command?.defaultBankAccount?.accountNumber),
        accountCheckDigit: cleanValue(
          command?.defaultBankAccount?.accountCheckDigit
        ),
        branchCheckDigit: cleanValue(
          command?.defaultBankAccount?.branchCheckDigit
        ),
        branchNumber: cleanValue(command?.defaultBankAccount?.branchNumber),
        bank: cleanValue(command?.defaultBankAccount?.bank),
        holderName: cleanValue(command?.defaultBankAccount?.holderName)
      }
    });
  }
}