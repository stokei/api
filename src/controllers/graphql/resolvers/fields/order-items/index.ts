import { OrderItemReferenceResolver } from './reference';

import { OrderItemAppResolver } from './app';
import { OrderItemReferenceResolver } from './reference';

export const OrderItemsFieldsResolvers = [
  OrderItemReferenceResolver,
  OrderItemAppResolver
];
