import { AccountModel } from '@/models/account.model';

interface IDataAccountUpdatedEvent {
  readonly updatedBy: string;
  readonly account: AccountModel;
}

export class AccountUpdatedEvent {
  readonly updatedBy: string;
  readonly account: AccountModel;

  constructor(data: IDataAccountUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.account = data.account;
  }
}
