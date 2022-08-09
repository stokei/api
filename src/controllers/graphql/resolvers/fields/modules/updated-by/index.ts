import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Module } from '@/controllers/graphql/types/module';
import { ModuleModel } from '@/models/module.model';

@Resolver(() => Module)
export class ModuleUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() module: ModuleModel) {
    return (
      module.updatedBy && this.accountsLoader.findByIds.load(module.updatedBy)
    );
  }
}
