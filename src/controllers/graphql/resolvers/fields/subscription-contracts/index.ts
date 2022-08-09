import { SubscriptionContractAppResolver } from './app';
import { SubscriptionContractCreatedByResolver } from './created-by';
import { SubscriptionContractReferenceResolver } from './reference';
import { SubscriptionContractUpdatedByResolver } from './updated-by';

export const SubscriptionContractsFieldsResolvers = [
  SubscriptionContractReferenceResolver,
  SubscriptionContractAppResolver,
  SubscriptionContractCreatedByResolver,
  SubscriptionContractUpdatedByResolver
];
