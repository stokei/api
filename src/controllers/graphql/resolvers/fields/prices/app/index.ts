import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Price } from '@/controllers/graphql/types/price';
import { PriceModel } from '@/models/price.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Price)
export class PriceAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() price: PriceModel) {
    return this.findAppByIdService.execute(price.app);
  }
}
