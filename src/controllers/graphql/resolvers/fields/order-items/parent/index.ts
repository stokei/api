import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { Order, OrderParentUnion } from '@/controllers/graphql/types/order';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrderModel } from '@/models/order.model';

@Resolver(() => Order)
export class OrderParentResolver {
  constructor(
    private readonly accountsLoader: AccountsLoader,
    private readonly appsLoader: AppsLoader
  ) {}

  @ResolveField(() => OrderParentUnion, { nullable: true })
  async parent(@Parent() orderParent: OrderModel) {
    const getParent = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.appsLoader.findByIds.load(orderParent.parent),
        [ServerStokeiApiIdPrefix.ACCOUNTS]: () =>
          this.accountsLoader.findByIds.load(orderParent.parent)
      };
      const serviceName = splitServiceId(orderParent.parent)?.service;
      return handlers?.[serviceName];
    };
    const getParentHandler = await getParent();
    return orderParent.parent && getParentHandler?.();
  }
}
