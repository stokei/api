import { Injectable, Scope } from '@nestjs/common';
import { FindAllAccountsService } from '@/services/accounts/find-all-accounts';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class AccountsLoader {
  constructor(private readonly accountsService: FindAllAccountsService) {}

  readonly findByIds = new DataLoader(async (accountIds: string[]) => {
    const accounts = await this.accountsService.execute({
      where: {
        AND: {
          ids: accountIds
        }
      }
    });
    const accountsMap = new Map(
      accounts?.items?.map((account) => [account.id, account])
    );
    return accountIds.map((accountId) => accountsMap.get(accountId));
  });
}
