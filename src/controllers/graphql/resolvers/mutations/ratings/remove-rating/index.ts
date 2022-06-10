import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveRatingInput } from '@/controllers/graphql/inputs/ratings/remove-rating.input';
import { Rating } from '@/controllers/graphql/types/rating';
import { RemoveRatingService } from '@/services/ratings/remove-rating';

@Resolver(() => Rating)
export class RemoveRatingResolver {
  constructor(private readonly removeRatingService: RemoveRatingService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Rating)
  async removeRating(@Args('input') data: RemoveRatingInput) {
    const response = await this.removeRatingService.execute(data);
    return response;
  }
}
