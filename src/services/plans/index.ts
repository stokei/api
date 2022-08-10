import { CreatePlanService } from './create-plan';
import { FindAllPlansService } from './find-all-plans';
import { FindDefaultPlanService } from './find-default-plan';
import { FindPlanByIdService } from './find-plan-by-id';

export const PlanServices = [
  CreatePlanService,
  FindDefaultPlanService,
  FindPlanByIdService,
  FindAllPlansService
];
