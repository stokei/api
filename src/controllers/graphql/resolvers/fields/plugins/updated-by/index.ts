import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Plugin } from '@/controllers/graphql/types/plugin';
import { PluginModel } from '@/models/plugin.model';

@Resolver(() => Plugin)
export class PluginUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() plugin: PluginModel) {
    return (
      plugin.updatedBy && this.accountsLoader.findByIds.load(plugin.updatedBy)
    );
  }
}
