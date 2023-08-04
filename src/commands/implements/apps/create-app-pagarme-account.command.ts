import { ICommand } from '@nestjs/cqrs';

import { CreateAppPagarmeAccountDTO } from '@/dtos/apps/create-app-pagarme-account.dto';
import { CreatePagarmeAccountBankAccountDTO } from '@/dtos/pagarme/create-pagarme-account.dto';
import { PagarmeAccountType } from '@/enums/pagarme-account-type.enum';

export class CreateAppPagarmeAccountCommand
  implements ICommand, CreateAppPagarmeAccountDTO
{
  documentType: PagarmeAccountType;
  document: string;
  defaultBankAccount: CreatePagarmeAccountBankAccountDTO;
  app: string;
  createdBy: string;
  constructor(data: CreateAppPagarmeAccountDTO) {
    this.documentType = data.documentType;
    this.document = data.document;
    this.defaultBankAccount = data.defaultBankAccount;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
