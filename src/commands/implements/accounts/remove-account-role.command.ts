import { ICommand } from '@nestjs/cqrs';

import { RemoveAccountRoleDTO } from '@/dtos/accounts/remove-account-role.dto';
import { AccountRole } from '@/enums/account-role.enum';

export class RemoveAccountRoleCommand
  implements ICommand, RemoveAccountRoleDTO
{
  role: AccountRole;
  account: string;
  removedBy: string;

  constructor(data: RemoveAccountRoleDTO) {
    this.role = data?.role;
    this.account = data?.account;
    this.removedBy = data?.removedBy;
  }
}
