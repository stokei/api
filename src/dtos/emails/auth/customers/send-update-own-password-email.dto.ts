import { AccountModel } from '@/models/account.model';

export interface SendAuthCustomersUpdateOwnPasswordEmailDTO {
  toAccount: AccountModel;
  app: string;
  createdBy: string;
}
