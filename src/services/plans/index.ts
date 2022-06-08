import { FindPlanByIdService } from './find-plan-by-id';
import { FindAllPlansService } from './find-all-plans';
import { CreatePlanService } from './create-plan';
import { RemovePlanService } from './remove-plan';
import { UpdatePlanService } from './update-plan';

export const PlanServices = [
  CreatePlanService,
  RemovePlanService,
  UpdatePlanService,
  FindPlanByIdService,
  FindAllPlansService
];
