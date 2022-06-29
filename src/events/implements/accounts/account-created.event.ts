import { AccountModel } from '@/models/account.model';

interface IDataAccountCreatedEvent {
  readonly createdBy: string;
  readonly account: AccountModel;
}

export class AccountCreatedEvent {
  readonly createdBy: string;
  readonly account: AccountModel;

  constructor(data: IDataAccountCreatedEvent) {
    this.createdBy = data.createdBy;
    this.account = data.account;
  }
}
