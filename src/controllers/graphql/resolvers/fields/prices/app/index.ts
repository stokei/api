import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Price } from '@/controllers/graphql/types/price';
import { PriceModel } from '@/models/price.model';

@Resolver(() => Price)
export class PriceAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() price: PriceModel) {
    return price.app && this.appsLoader.findByIds.load(price.app);
  }
}
