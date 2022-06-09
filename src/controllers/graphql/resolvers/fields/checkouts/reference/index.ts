import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CheckoutsLoader } from '@/controllers/graphql/dataloaders/checkouts.loader';
import { Checkout } from '@/controllers/graphql/types/checkout';

@Resolver(() => Checkout)
export class CheckoutReferenceResolver {
  constructor(private readonly checkoutsLoader: CheckoutsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.checkoutsLoader.findByIds.load(reference.id);
  }
}
