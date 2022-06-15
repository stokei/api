import { AccountModel } from '@/models/account.model';

interface IDataPasswordChangedEvent {
  readonly account: AccountModel;
}

export class PasswordChangedEvent {
  readonly account: AccountModel;

  constructor(data: IDataPasswordChangedEvent) {
    this.account = data.account;
  }
}
