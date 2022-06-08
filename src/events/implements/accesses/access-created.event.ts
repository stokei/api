import { AccessModel } from '@/models/access.model';
import { AccountModel } from '@/models/account.model';

interface IDataAccessCreatedEvent {
  readonly access: AccessModel;
  readonly account: AccountModel;
}

export class AccessCreatedEvent {
  readonly access: AccessModel;
  readonly account: AccountModel;

  constructor(data: IDataAccessCreatedEvent) {
    this.access = data.access;
    this.account = data.account;
  }
}
