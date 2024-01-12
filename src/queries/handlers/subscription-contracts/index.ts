import { FindAllSubscriptionContractsQueryHandler } from './find-all-subscription-contracts';
import { FindAllSubscriptionContractsByItemQueryHandler } from './find-all-subscription-contracts-by-item';
import { FindSubscriptionContractByIdQueryHandler } from './find-subscription-contract-by-id';
import { UserHasSubscriptionContractActiveQueryHandler } from './user-has-subscription-contract-active';

export const SubscriptionContractQueriesHandlers = [
  FindSubscriptionContractByIdQueryHandler,
  FindAllSubscriptionContractsQueryHandler,
  FindAllSubscriptionContractsByItemQueryHandler,
  UserHasSubscriptionContractActiveQueryHandler
];
