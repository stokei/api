import { AccountRole } from '@/enums/account-role.enum';
import { AccountStatus } from '@/enums/account-status.enum';

export interface ExistsAccountsWhereDTO {
  parent?: string;
  email?: string;
  username?: string;
  status?: AccountStatus;
  roles?: AccountRole[];
}

export interface ExistsAccountsDTO {
  where: ExistsAccountsWhereDTO;
}
