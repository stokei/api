import { ICommand } from '@nestjs/cqrs';

import { AddAccountRoleDTO } from '@/dtos/accounts/add-account-role.dto';
import { AccountRole } from '@/enums/account-role.enum';

export class AddAccountRoleCommand implements ICommand, AddAccountRoleDTO {
  role: AccountRole;
  account: string;
  createdBy: string;

  constructor(data: AddAccountRoleDTO) {
    this.role = data?.role;
    this.account = data?.account;
    this.createdBy = data?.createdBy;
  }
}
