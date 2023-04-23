import { FindAllPlansQueryHandler } from './find-all-plans';
import { FindPlanByIdQueryHandler } from './find-plan-by-id';
import { FindPlanPriceByTypeQueryHandler } from './find-plan-price-by-type';

export const PlanQueriesHandlers = [
  FindPlanByIdQueryHandler,
  FindAllPlansQueryHandler,
  FindPlanPriceByTypeQueryHandler
];
