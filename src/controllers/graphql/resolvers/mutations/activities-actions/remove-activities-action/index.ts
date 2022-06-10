import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveActivitiesActionInput } from '@/controllers/graphql/inputs/activities-actions/remove-activities-action.input';
import { ActivitiesAction } from '@/controllers/graphql/types/activities-action';
import { RemoveActivitiesActionService } from '@/services/activities-actions/remove-activities-action';

@Resolver(() => ActivitiesAction)
export class RemoveActivitiesActionResolver {
  constructor(
    private readonly removeActivitiesActionService: RemoveActivitiesActionService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ActivitiesAction)
  async removeActivitiesAction(
    @Args('input') data: RemoveActivitiesActionInput
  ) {
    const response = await this.removeActivitiesActionService.execute(data);
    return response;
  }
}
