import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveActivityInput } from '@/controllers/graphql/inputs/activities/remove-activity.input';
import { Activity } from '@/controllers/graphql/types/activity';
import { RemoveActivityService } from '@/services/activities/remove-activity';

@Resolver(() => Activity)
export class RemoveActivityResolver {
  constructor(private readonly removeActivityService: RemoveActivityService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Activity)
  async removeActivity(@Args('input') data: RemoveActivityInput) {
    const response = await this.removeActivityService.execute(data);
    return response;
  }
}
