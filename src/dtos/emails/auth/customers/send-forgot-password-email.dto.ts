import { AccountModel } from '@/models/account.model';

export interface SendAuthCustomersForgotPasswordEmailDTO {
  toAccount: AccountModel;
  app: string;
  createdBy: string;
}
