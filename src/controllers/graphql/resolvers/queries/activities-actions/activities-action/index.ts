import { Args, Query, Resolver } from '@nestjs/graphql';

import { ActivitiesActionsLoader } from '@/controllers/graphql/dataloaders/activities-actions.loader';
import { ActivitiesAction } from '@/controllers/graphql/types/activities-action';
import {
  ActivitiesActionNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ActivitiesAction)
export class ActivitiesActionResolver {
  constructor(
    private readonly activitiesActionsLoader: ActivitiesActionsLoader
  ) {}

  @Query(() => ActivitiesAction)
  async activitiesAction(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const activitiesAction = await this.activitiesActionsLoader.findByIds.load(
      id
    );
    if (!activitiesAction) {
      throw new ActivitiesActionNotFoundException();
    }
    return activitiesAction;
  }
}
