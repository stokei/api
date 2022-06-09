import { Args, Query, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { Price } from '@/controllers/graphql/types/price';
import { ParamNotFoundException, PriceNotFoundException } from '@/errors';

@Resolver(() => Price)
export class PriceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @Query(() => Price)
  async price(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const price = await this.pricesLoader.findByIds.load(id);
    if (!price) {
      throw new PriceNotFoundException();
    }
    return price;
  }
}
