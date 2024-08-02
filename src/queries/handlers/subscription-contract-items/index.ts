import { FindAllSubscriptionContractItemsQueryHandler } from './find-all-subscription-contract-items';
import { FindAllSubscriptionContractItemsBySubscriptionQueryHandler } from './find-all-subscription-contract-items-by-subscription';
import { FindSubscriptionContractItemByIdQueryHandler } from './find-subscription-contract-item-by-id';

export const SubscriptionContractItemQueriesHandlers = [
  FindSubscriptionContractItemByIdQueryHandler,
  FindAllSubscriptionContractItemsQueryHandler,
  FindAllSubscriptionContractItemsBySubscriptionQueryHandler
];
