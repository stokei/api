import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Feature } from '@/controllers/graphql/types/feature';
import { FeatureModel } from '@/models/feature.model';

@Resolver(() => Feature)
export class FeatureUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() feature: FeatureModel) {
    return (
      feature.updatedBy && this.accountsLoader.findByIds.load(feature.updatedBy)
    );
  }
}
