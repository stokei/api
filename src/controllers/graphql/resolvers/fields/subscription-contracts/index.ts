import { SubscriptionContractAppResolver } from './app';
import { SubscriptionContractReferenceResolver } from './reference';

export const SubscriptionContractsFieldsResolvers = [
  SubscriptionContractReferenceResolver,
  SubscriptionContractAppResolver
];
