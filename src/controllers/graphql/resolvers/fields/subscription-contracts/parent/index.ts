import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import {
  SubscriptionContract,
  SubscriptionContractParentUnion
} from '@/controllers/graphql/types/subscription-contract';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractParentResolver {
  constructor(
    private readonly accountsLoader: AccountsLoader,
    private readonly appsLoader: AppsLoader
  ) {}

  @ResolveField(() => SubscriptionContractParentUnion, { nullable: true })
  async parent(
    @Parent() subscriptionContractParent: SubscriptionContractModel
  ) {
    const getParent = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.appsLoader.findByIds.load(subscriptionContractParent.parent),
        [ServerStokeiApiIdPrefix.ACCOUNTS]: () =>
          this.accountsLoader.findByIds.load(subscriptionContractParent.parent)
      };
      const serviceName = splitServiceId(subscriptionContractParent.parent)
        ?.service;
      return handlers?.[serviceName];
    };
    const getParentHandler = await getParent();
    return subscriptionContractParent.parent && getParentHandler?.();
  }
}
