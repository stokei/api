import { Resolver, ResolveReference } from '@nestjs/graphql';

import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import { Plan } from '@/controllers/graphql/types/plan';

@Resolver(() => Plan)
export class PlanReferenceResolver {
  constructor(private readonly plansLoader: PlansLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.plansLoader.findByIds.load(reference.id);
  }
}
