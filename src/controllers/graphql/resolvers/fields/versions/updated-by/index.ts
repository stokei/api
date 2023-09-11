import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Version } from '@/controllers/graphql/types/version';
import { VersionModel } from '@/models/version.model';

@Resolver(() => Version)
export class VersionUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() version: VersionModel) {
    return (
      version.updatedBy && this.accountsLoader.findByIds.load(version.updatedBy)
    );
  }
}
