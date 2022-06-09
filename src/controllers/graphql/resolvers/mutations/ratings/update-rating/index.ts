import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateRatingInput } from '@/controllers/graphql/inputs/ratings/update-rating.input';
import { Rating } from '@/controllers/graphql/types/rating';
import { UpdateRatingService } from '@/services/ratings/update-rating';

@Resolver(() => Rating)
export class UpdateRatingResolver {
  constructor(private readonly updateRatingService: UpdateRatingService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Rating)
  async updateRating(
    @Args('input') data: UpdateRatingInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateRatingService.execute(data);
    return response;
  }
}
