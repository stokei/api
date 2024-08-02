import { SubscriptionContractItemResolver } from './subscription-contract-item';
import { SubscriptionContractItemsResolver } from './subscription-contract-items';
import { SubscriptionContractItemsBySubscriptionResolver } from './subscription-contract-items-by-subscription';

export const SubscriptionContractItemsQueries = [
  SubscriptionContractItemResolver,
  SubscriptionContractItemsResolver,
  SubscriptionContractItemsBySubscriptionResolver
];
