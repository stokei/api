import { Resolver, ResolveReference } from '@nestjs/graphql';
import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { Price } from '@/controllers/graphql/types/price';

@Resolver(() => Price)
export class PriceReferenceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.pricesLoader.findByIds.load(reference.id);
  }
}
