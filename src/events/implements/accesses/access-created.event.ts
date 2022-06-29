import { AccessModel } from '@/models/access.model';
import { AccountModel } from '@/models/account.model';

interface IDataAccessCreatedEvent {
  readonly createdBy: string;
  readonly access: AccessModel;
  readonly account: AccountModel;
}

export class AccessCreatedEvent {
  readonly createdBy: string;
  readonly access: AccessModel;
  readonly account: AccountModel;

  constructor(data: IDataAccessCreatedEvent) {
    this.createdBy = data.createdBy;
    this.access = data.access;
    this.account = data.account;
  }
}
