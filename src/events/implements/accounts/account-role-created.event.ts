import { AccountRole } from '@/enums/account-role.enum';
import { AccountModel } from '@/models/account.model';

interface IDataAccountRoleCreatedEvent {
  readonly role: AccountRole;
  readonly account: AccountModel;
  readonly createdBy: string;
}

export class AccountRoleCreatedEvent {
  readonly role: AccountRole;
  readonly account: AccountModel;
  readonly createdBy: string;

  constructor(data: IDataAccountRoleCreatedEvent) {
    this.role = data.role;
    this.account = data.account;
    this.createdBy = data.createdBy;
  }
}
