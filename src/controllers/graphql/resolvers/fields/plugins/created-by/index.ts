import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Plugin } from '@/controllers/graphql/types/plugin';
import { PluginModel } from '@/models/plugin.model';

@Resolver(() => Plugin)
export class PluginCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() plugin: PluginModel) {
    return (
      plugin.createdBy && this.accountsLoader.findByIds.load(plugin.createdBy)
    );
  }
}
