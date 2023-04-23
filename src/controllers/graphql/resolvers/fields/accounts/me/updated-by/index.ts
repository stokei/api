import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountModel } from '@/models/account.model';

@Resolver(() => MeAccount)
export class MeAccountUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() account: AccountModel) {
    return this.accountsLoader.findByIds.load(account.updatedBy);
  }
}
