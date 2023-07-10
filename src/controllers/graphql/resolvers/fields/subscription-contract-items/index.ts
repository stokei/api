import { SubscriptionContractItemAppResolver } from './app';
import { SubscriptionContractItemCreatedByResolver } from './created-by';
import { SubscriptionContractItemPriceResolver } from './price';
import { SubscriptionContractItemProductResolver } from './product';
import { SubscriptionContractItemRecurringResolver } from './recurring';
import { SubscriptionContractItemReferenceResolver } from './reference';
import { SubscriptionContractItemUpdatedByResolver } from './updated-by';

export const SubscriptionContractItemsFieldsResolvers = [
  SubscriptionContractItemReferenceResolver,
  SubscriptionContractItemAppResolver,
  SubscriptionContractItemCreatedByResolver,
  SubscriptionContractItemUpdatedByResolver,
  SubscriptionContractItemProductResolver,
  SubscriptionContractItemRecurringResolver,
  SubscriptionContractItemPriceResolver
];
