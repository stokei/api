import { CreatePlanResolver } from './create-plan';
import { RemovePlanResolver } from './remove-plan';
import { UpdatePlanResolver } from './update-plan';

export const PlansMutations = [
  CreatePlanResolver,
  RemovePlanResolver,
  UpdatePlanResolver
];
