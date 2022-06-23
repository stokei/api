import { AccountEntity } from '@/entities';
import { AccountModel } from '@/models/account.model';

export class AccountMapper {
  toModel(account: AccountEntity) {
    return account && new AccountModel(account);
  }
  toModels(accounts: AccountEntity[]) {
    return accounts?.length > 0
      ? accounts.map(this.toModel).filter(Boolean)
      : [];
  }
}
