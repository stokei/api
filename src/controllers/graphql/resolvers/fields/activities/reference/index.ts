import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ActivitiesLoader } from '@/controllers/graphql/dataloaders/activities.loader';
import { Activity } from '@/controllers/graphql/types/activity';

@Resolver(() => Activity)
export class ActivityReferenceResolver {
  constructor(private readonly activitiesLoader: ActivitiesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.activitiesLoader.findByIds.load(reference.id);
  }
}
