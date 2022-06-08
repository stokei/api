import { AccountModel } from '@/models/account.model';

interface IDataAccountRemovedEvent {
  readonly account: AccountModel;
}

export class AccountRemovedEvent {
  readonly account: AccountModel;

  constructor(data: IDataAccountRemovedEvent) {
    this.account = data.account;
  }
}
