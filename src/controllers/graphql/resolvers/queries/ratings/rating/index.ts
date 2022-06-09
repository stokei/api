import { Args, Query, Resolver } from '@nestjs/graphql';

import { RatingsLoader } from '@/controllers/graphql/dataloaders/ratings.loader';
import { Rating } from '@/controllers/graphql/types/rating';
import { ParamNotFoundException, RatingNotFoundException } from '@/errors';

@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingsLoader: RatingsLoader) {}

  @Query(() => Rating)
  async rating(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const rating = await this.ratingsLoader.findByIds.load(id);
    if (!rating) {
      throw new RatingNotFoundException();
    }
    return rating;
  }
}
