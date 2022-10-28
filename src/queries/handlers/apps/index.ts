import { FindAllAppsQueryHandler } from './find-all-apps';
import { FindAppByIdQueryHandler } from './find-app-by-id';
import { FindAppCurrentDomainQueryHandler } from './find-app-current-domain';

export const AppQueriesHandlers = [
  FindAppByIdQueryHandler,
  FindAllAppsQueryHandler,
  FindAppCurrentDomainQueryHandler
];
