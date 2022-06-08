import { convertToISODateString } from '@stokei/nestjs';
import { AccountEntity } from '@/entities';
import { AccountModel } from '@/models/account.model';

export class AccountMapper {
  toModel(account: AccountEntity) {
    return (
      account &&
      new AccountModel({
        ...account,
        dateBirthday: convertToISODateString(account.dateBirthday),
        canceledAt: convertToISODateString(account.canceledAt),
        updatedAt: convertToISODateString(account.updatedAt),
        createdAt: convertToISODateString(account.createdAt)
      })
    );
  }
  toModels(accounts: AccountEntity[]) {
    return accounts?.length > 0
      ? accounts.map(this.toModel).filter(Boolean)
      : [];
  }
}
