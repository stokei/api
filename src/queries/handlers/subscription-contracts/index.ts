import { FindAllSubscriptionContractsQueryHandler } from './find-all-subscription-contracts';
import { FindSubscriptionContractByIdQueryHandler } from './find-subscription-contract-by-id';

export const SubscriptionContractQueriesHandlers = [
  FindSubscriptionContractByIdQueryHandler,
  FindAllSubscriptionContractsQueryHandler
];
