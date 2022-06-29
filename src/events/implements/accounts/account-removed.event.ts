import { AccountModel } from '@/models/account.model';

interface IDataAccountRemovedEvent {
  readonly removedBy: string;
  readonly account: AccountModel;
}

export class AccountRemovedEvent {
  readonly removedBy: string;
  readonly account: AccountModel;

  constructor(data: IDataAccountRemovedEvent) {
    this.removedBy = data.removedBy;
    this.account = data.account;
  }
}
