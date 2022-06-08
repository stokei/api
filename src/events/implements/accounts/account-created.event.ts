import { AccountModel } from '@/models/account.model';

interface IDataAccountCreatedEvent {
  readonly account: AccountModel;
}

export class AccountCreatedEvent {
  readonly account: AccountModel;

  constructor(data: IDataAccountCreatedEvent) {
    this.account = data.account;
  }
}
