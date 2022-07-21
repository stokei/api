import { CreatePlanService } from './create-plan';
import { FindAllPlansService } from './find-all-plans';
import { FindPlanByIdService } from './find-plan-by-id';

export const PlanServices = [
  CreatePlanService,
  FindPlanByIdService,
  FindAllPlansService
];
