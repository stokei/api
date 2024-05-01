import { FindAllAppsQueryHandler } from './find-all-apps';
import { FindAppBalancesQueryHandler } from './find-app-balances';
import { FindAppBillingQueryHandler } from './find-app-billing';
import { FindAppByIdQueryHandler } from './find-app-by-id';
import { FindAppBySlugQueryHandler } from './find-app-by-slug';
import { FindAppCurrentDomainQueryHandler } from './find-app-current-domain';
import { FindAppCurrentSubscriptionContractQueryHandler } from './find-app-current-subscription-contract';
import { FindAppEmailInformationsQueryHandler } from './find-app-email-informations';

export const AppQueriesHandlers = [
  FindAppByIdQueryHandler,
  FindAllAppsQueryHandler,
  FindAppCurrentSubscriptionContractQueryHandler,
  FindAppEmailInformationsQueryHandler,
  FindAppBillingQueryHandler,
  FindAppBalancesQueryHandler,
  FindAppBySlugQueryHandler,
  FindAppCurrentDomainQueryHandler
];
