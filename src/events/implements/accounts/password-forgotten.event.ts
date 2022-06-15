import { AccountModel } from '@/models/account.model';

interface IDataPasswordForgottenEvent {
  readonly account: AccountModel;
}

export class PasswordForgottenEvent {
  readonly account: AccountModel;

  constructor(data: IDataPasswordForgottenEvent) {
    this.account = data.account;
  }
}
