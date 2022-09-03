import { FindAllAppsQueryHandler } from './find-all-apps';
import { FindAppByIdQueryHandler } from './find-app-by-id';
import { FindAppCurrentDomainQueryHandler } from './find-app-current-domain';
import { FindAppCurrentSubscriptionPlanQueryHandler } from './find-app-current-subscription-plan';

export const AppQueriesHandlers = [
  FindAppByIdQueryHandler,
  FindAllAppsQueryHandler,
  FindAppCurrentDomainQueryHandler,
  FindAppCurrentSubscriptionPlanQueryHandler
];
