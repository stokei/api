import { AccountModel } from '@/models/account.model';

export interface SendAuthCustomersAccountConfigurationPendingEmailDTO {
  toAccount: AccountModel;
  plainTextPassword?: string;
  app: string;
  createdBy: string;
}
