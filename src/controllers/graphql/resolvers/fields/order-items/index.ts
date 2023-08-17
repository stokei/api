import { OrderItemAppResolver } from './app';
import { OrderItemCreatedByResolver } from './created-by';
import { OrderItemPriceResolver } from './price';
import { OrderItemRecurringResolver } from './recurring';
import { OrderItemReferenceResolver } from './reference';
import { OrderItemUpdatedByResolver } from './updated-by';

export const OrderItemsFieldsResolvers = [
  OrderItemReferenceResolver,
  OrderItemAppResolver,
  OrderItemCreatedByResolver,
  OrderItemUpdatedByResolver,
  OrderItemRecurringResolver,
  OrderItemPriceResolver
];
