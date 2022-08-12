import { OrderItemAppResolver } from './app';
import { OrderItemAvatarResolver } from './avatar';
import { OrderItemCreatedByResolver } from './created-by';
import { OrderItemCurrencyResolver } from './currency';
import { OrderItemProductResolver } from './product';
import { OrderItemReferenceResolver } from './reference';
import { OrderItemUpdatedByResolver } from './updated-by';

export const OrderItemsFieldsResolvers = [
  OrderItemReferenceResolver,
  OrderItemAppResolver,
  OrderItemAvatarResolver,
  OrderItemCurrencyResolver,
  OrderItemProductResolver,
  OrderItemCreatedByResolver,
  OrderItemUpdatedByResolver
];
