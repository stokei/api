import { FindAllPlansQueryHandler } from './find-all-plans';
import { FindPlanByIdQueryHandler } from './find-plan-by-id';

export const PlanQueriesHandlers = [
  FindPlanByIdQueryHandler,
  FindAllPlansQueryHandler
];
