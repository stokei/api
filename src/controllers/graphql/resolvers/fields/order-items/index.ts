import { OrderItemAppResolver } from './app';
import { OrderItemCreatedByResolver } from './created-by';
import { OrderParentResolver } from './parent';
import { OrderItemPriceResolver } from './price';
import { OrderItemProductResolver } from './product';
import { OrderItemRecurringResolver } from './recurring';
import { OrderItemReferenceResolver } from './reference';
import { OrderItemUpdatedByResolver } from './updated-by';

export const OrderItemsFieldsResolvers = [
  OrderItemReferenceResolver,
  OrderItemAppResolver,
  OrderItemCreatedByResolver,
  OrderItemUpdatedByResolver,
  OrderItemRecurringResolver,
  OrderItemPriceResolver,
  OrderItemProductResolver,
  OrderParentResolver
];
