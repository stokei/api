import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ActivitiesActionsLoader } from '@/controllers/graphql/dataloaders/activities-actions.loader';
import { ActivitiesAction } from '@/controllers/graphql/types/activities-action';

@Resolver(() => ActivitiesAction)
export class ActivitiesActionReferenceResolver {
  constructor(
    private readonly activitiesActionsLoader: ActivitiesActionsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.activitiesActionsLoader.findByIds.load(reference.id);
  }
}
