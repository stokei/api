import { Resolver, ResolveReference } from '@nestjs/graphql';

import { RatingsLoader } from '@/controllers/graphql/dataloaders/ratings.loader';
import { Rating } from '@/controllers/graphql/types/rating';

@Resolver(() => Rating)
export class RatingReferenceResolver {
  constructor(private readonly ratingsLoader: RatingsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.ratingsLoader.findByIds.load(reference.id);
  }
}
