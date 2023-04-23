import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Feature } from '@/controllers/graphql/types/feature';
import { FeatureModel } from '@/models/feature.model';

@Resolver(() => Feature)
export class FeatureCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() feature: FeatureModel) {
    return (
      feature.createdBy && this.accountsLoader.findByIds.load(feature.createdBy)
    );
  }
}
