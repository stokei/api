import { PagarmeAccountType } from '@/enums/pagarme-account-type.enum';
import { PagarmeBankAccountType } from '@/enums/pagarme-bank-account-type.enum';

export interface CreatePagarmeAccountBankAccountDTO {
  bankAccountType: PagarmeBankAccountType;
  holderType: PagarmeAccountType;
  holderDocument: string;
  accountNumber: string;
  accountCheckDigit: string;
  branchCheckDigit: string;
  branchNumber: string;
  bank: string;
  holderName: string;
}
export interface CreatePagarmeAccountDTO {
  app: string;
  documentType: PagarmeAccountType;
  name: string;
  email: string;
  document: string;
  defaultBankAccount: CreatePagarmeAccountBankAccountDTO;
}

export interface CreatePagarmeAccountResponse {
  id: string;
}
