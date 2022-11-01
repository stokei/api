import { CalculatePlanPriceService } from './calculate-plan-price';
import { CreatePlanService } from './create-plan';
import { FindAllPlansService } from './find-all-plans';
import { FindPlanByIdService } from './find-plan-by-id';
import { FindPlanPriceByTypeService } from './find-plan-price-by-type';
import { UpdatePlanService } from './update-plan';

export const PlanServices = [
  CalculatePlanPriceService,
  UpdatePlanService,
  CreatePlanService,
  FindPlanByIdService,
  FindAllPlansService,
  FindPlanPriceByTypeService
];
