import { SubscriptionContractResolver } from './subscription-contract';
import { SubscriptionContractsResolver } from './subscription-contracts';
import { SubscriptionContractsByItemResolver } from './subscription-contracts-by-item';

export const SubscriptionContractsQueries = [
  SubscriptionContractResolver,
  SubscriptionContractsResolver,
  SubscriptionContractsByItemResolver
];
