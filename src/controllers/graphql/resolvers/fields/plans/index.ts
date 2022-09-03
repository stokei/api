import { PlanCreatedByResolver } from './created-by';
import { PlanPriceResolver } from './price';
import { PlanReferenceResolver } from './reference';
import { PlanUpdatedByResolver } from './updated-by';

export const PlansFieldsResolvers = [
  PlanReferenceResolver,
  PlanCreatedByResolver,
  PlanPriceResolver,
  PlanUpdatedByResolver
];
