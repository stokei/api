import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { AccountModel } from '@/models/account.model';

@Resolver(() => Account)
export class AccountCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() account: AccountModel) {
    return (
      account.createdBy && this.accountsLoader.findByIds.load(account.createdBy)
    );
  }
}
