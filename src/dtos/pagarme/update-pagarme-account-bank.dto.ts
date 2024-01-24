import { PagarmeAccountType } from '@/enums/pagarme-account-type.enum';
import { PagarmeBankAccountType } from '@/enums/pagarme-bank-account-type.enum';

export interface UpdatePagarmeAccountBankAccountDTO {
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
export interface UpdatePagarmeAccountBankDTO {
  app: string;
  recipient: string;
  defaultBankAccount: UpdatePagarmeAccountBankAccountDTO;
}

export interface UpdatePagarmeAccountBankResponse {
  id: string;
}
