import { FindAllAppsQueryHandler } from './find-all-apps';
import { FindAppByIdQueryHandler } from './find-app-by-id';
import { FindAppCurrentPlanQueryHandler } from './find-app-current-plan';

export const AppQueriesHandlers = [
  FindAppByIdQueryHandler,
  FindAllAppsQueryHandler,
  FindAppCurrentPlanQueryHandler
];
