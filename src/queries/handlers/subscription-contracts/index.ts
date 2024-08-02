import { FindAllSubscriptionContractsQueryHandler } from './find-all-subscription-contracts';
import { FindSubscriptionContractActiveByProductQueryHandler } from './find-subscription-contract-active-by-product';
import { FindSubscriptionContractByIdQueryHandler } from './find-subscription-contract-by-id';
import { UserHasSubscriptionContractActiveQueryHandler } from './user-has-subscription-contract-active';

export const SubscriptionContractQueriesHandlers = [
  FindSubscriptionContractByIdQueryHandler,
  FindAllSubscriptionContractsQueryHandler,
  UserHasSubscriptionContractActiveQueryHandler,
  FindSubscriptionContractActiveByProductQueryHandler
];
