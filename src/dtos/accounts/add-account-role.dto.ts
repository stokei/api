import { AccountRole } from '@/enums/account-role.enum';

export interface AddAccountRoleDTO {
  role: AccountRole;
  account: string;
  createdBy: string;
}
