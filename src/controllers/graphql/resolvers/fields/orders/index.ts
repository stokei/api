import { OrderAppResolver } from './app';
import { OrderCreatedByResolver } from './created-by';
import { OrderReferenceResolver } from './reference';
import { OrderUpdatedByResolver } from './updated-by';

export const OrdersFieldsResolvers = [
  OrderReferenceResolver,
  OrderAppResolver,
  OrderCreatedByResolver,
  OrderUpdatedByResolver
];
