import { CalculatePlanPriceService } from './calculate-plan-price';
import { CreatePlanService } from './create-plan';
import { FindAllPlansService } from './find-all-plans';
import { FindPlanByIdService } from './find-plan-by-id';

export const PlanServices = [
  CalculatePlanPriceService,
  CreatePlanService,
  FindPlanByIdService,
  FindAllPlansService
];
