import { FindAllPlansQueryHandler } from './find-all-plans';
import { FindDefaultPlanQueryHandler } from './find-default-plan';
import { FindPlanByIdQueryHandler } from './find-plan-by-id';

export const PlanQueriesHandlers = [
  FindPlanByIdQueryHandler,
  FindAllPlansQueryHandler,
  FindDefaultPlanQueryHandler
];
