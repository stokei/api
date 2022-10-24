import { FindAllSubscriptionContractItemsQueryHandler } from './find-all-subscription-contract-items';
import { FindSubscriptionContractItemByIdQueryHandler } from './find-subscription-contract-item-by-id';

export const SubscriptionContractItemQueriesHandlers = [
  FindSubscriptionContractItemByIdQueryHandler,
  FindAllSubscriptionContractItemsQueryHandler
];
