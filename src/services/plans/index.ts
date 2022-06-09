import { CreatePlanService } from './create-plan';
import { FindAllPlansService } from './find-all-plans';
import { FindPlanByIdService } from './find-plan-by-id';
import { RemovePlanService } from './remove-plan';
import { UpdatePlanService } from './update-plan';

export const PlanServices = [
  CreatePlanService,
  RemovePlanService,
  UpdatePlanService,
  FindPlanByIdService,
  FindAllPlansService
];
