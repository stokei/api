import { Args, Query, Resolver } from '@nestjs/graphql';
import { ActivitiesLoader } from '@/controllers/graphql/dataloaders/activities.loader';
import { Activity } from '@/controllers/graphql/types/activity';
import { ActivityNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private readonly activitiesLoader: ActivitiesLoader) {}

  @Query(() => Activity)
  async activity(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const activity = await this.activitiesLoader.findByIds.load(id);
    if (!activity) {
      throw new ActivityNotFoundException();
    }
    return activity;
  }
}
