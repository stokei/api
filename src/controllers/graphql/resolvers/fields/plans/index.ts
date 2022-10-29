import { PlanCreatedByResolver } from './created-by';
import { PlanReferenceResolver } from './reference';
import { PlanUpdatedByResolver } from './updated-by';

export const PlansFieldsResolvers = [
  PlanReferenceResolver,
  PlanCreatedByResolver,
  PlanUpdatedByResolver
];
