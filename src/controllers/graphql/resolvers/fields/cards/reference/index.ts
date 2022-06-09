import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CardsLoader } from '@/controllers/graphql/dataloaders/cards.loader';
import { Card } from '@/controllers/graphql/types/card';

@Resolver(() => Card)
export class CardReferenceResolver {
  constructor(private readonly cardsLoader: CardsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.cardsLoader.findByIds.load(reference.id);
  }
}
