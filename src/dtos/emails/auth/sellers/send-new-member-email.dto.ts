import { AccountModel } from '@/models/account.model';

export interface SendAuthSellersNewMemberEmailDTO {
  account: AccountModel;
  app: string;
  createdBy: string;
}
