import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Site } from '@/controllers/graphql/types/site';
import { SiteModel } from '@/models/site.model';

@Resolver(() => Site)
export class SiteCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() site: SiteModel) {
    return site.createdBy && this.accountsLoader.findByIds.load(site.createdBy);
  }
}
