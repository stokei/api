import { SubscriptionContractResolver } from './subscription-contract';
import { SubscriptionContractActiveByProductResolver } from './subscription-contract-active-by-product';
import { SubscriptionContractsResolver } from './subscription-contracts';

export const SubscriptionContractsQueries = [
  SubscriptionContractResolver,
  SubscriptionContractsResolver,
  SubscriptionContractActiveByProductResolver
];
