import { AccountStatus } from '@/enums/account-status.enum';

export interface ExistsAccountsWhereDTO {
  app?: string;
  email?: string;
  username?: string;
  status?: AccountStatus;
}

export interface ExistsAccountsDTO {
  where: ExistsAccountsWhereDTO;
}
