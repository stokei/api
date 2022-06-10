import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateRatingInput } from '@/controllers/graphql/inputs/ratings/create-rating.input';
import { Rating } from '@/controllers/graphql/types/rating';
import { CreateRatingService } from '@/services/ratings/create-rating';

@Resolver(() => Rating)
export class CreateRatingResolver {
  constructor(private readonly createRatingService: CreateRatingService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Rating)
  async createRating(@Args('input') data: CreateRatingInput) {
    const response = await this.createRatingService.execute(data);
    return response;
  }
}
