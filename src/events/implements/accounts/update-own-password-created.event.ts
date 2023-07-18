import { AccountModel } from '@/models/account.model';

interface IDataUpdateOwnPasswordCreatedEvent {
  readonly account: AccountModel;
}

export class UpdateOwnPasswordCreatedEvent {
  readonly account: AccountModel;

  constructor(data: IDataUpdateOwnPasswordCreatedEvent) {
    this.account = data.account;
  }
}
