import { AccountModel } from '@/models/account.model';

interface IDataAccountUpdatedEvent {
  readonly account: AccountModel;
}

export class AccountUpdatedEvent {
  readonly account: AccountModel;

  constructor(data: IDataAccountUpdatedEvent) {
    this.account = data.account;
  }
}
