import { PagarmeAccountType } from '@/enums/pagarme-account-type.enum';

import { CreatePagarmeAccountBankAccountDTO } from '../pagarme/create-pagarme-account.dto';

export interface CreateAppPagarmeAccountDTO {
  type: PagarmeAccountType;
  document: string;
  defaultBankAccount: CreatePagarmeAccountBankAccountDTO;
  app: string;
  createdBy: string;
}
