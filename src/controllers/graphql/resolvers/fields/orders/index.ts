import { OrderAppResolver } from './app';
import { OrderCreatedByResolver } from './created-by';
import { OrderCurrencyResolver } from './currency';
import { OrderReferenceResolver } from './reference';
import { OrderUpdatedByResolver } from './updated-by';

export const OrdersFieldsResolvers = [
  OrderReferenceResolver,
  OrderAppResolver,
  OrderCreatedByResolver,
  OrderUpdatedByResolver,
  OrderCurrencyResolver
];
