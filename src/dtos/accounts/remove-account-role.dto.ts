import { AccountRole } from '@/enums/account-role.enum';

export interface RemoveAccountRoleDTO {
  role: AccountRole;
  account: string;
  removedBy: string;
}
