import { CalculatePlanPriceQueryHandler } from './calculate-plan-price';
import { FindAllPlansQueryHandler } from './find-all-plans';
import { FindPlanByIdQueryHandler } from './find-plan-by-id';

export const PlanQueriesHandlers = [
  CalculatePlanPriceQueryHandler,
  FindPlanByIdQueryHandler,
  FindAllPlansQueryHandler
];
