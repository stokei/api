import { SubscriptionContractItemAppResolver } from './app';
import { SubscriptionContractItemCreatedByResolver } from './created-by';
import { SubscriptionContractItemProductResolver } from './product';
import { SubscriptionContractItemReferenceResolver } from './reference';
import { SubscriptionContractItemUpdatedByResolver } from './updated-by';

export const SubscriptionContractItemsFieldsResolvers = [
  SubscriptionContractItemReferenceResolver,
  SubscriptionContractItemAppResolver,
  SubscriptionContractItemCreatedByResolver,
  SubscriptionContractItemUpdatedByResolver,
  SubscriptionContractItemProductResolver
];
