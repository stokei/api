import { AccountRole } from '@/enums/account-role.enum';
import { AccountModel } from '@/models/account.model';

interface IDataAccountRoleRemovedEvent {
  readonly role: AccountRole;
  readonly account: AccountModel;
  readonly removedBy: string;
}

export class AccountRoleRemovedEvent {
  readonly role: AccountRole;
  readonly account: AccountModel;
  readonly removedBy: string;

  constructor(data: IDataAccountRoleRemovedEvent) {
    this.role = data.role;
    this.account = data.account;
    this.removedBy = data.removedBy;
  }
}
