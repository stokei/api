import { OrderAppResolver } from './app';
import { OrderCartResolver } from './cart';
import { OrderCreatedByResolver } from './created-by';
import { OrderCurrencyResolver } from './currency';
import { OrderCustomerResolver } from './customer';
import { OrderOrderItemsResolver } from './items';
import { OrderReferenceResolver } from './reference';
import { OrderUpdatedByResolver } from './updated-by';

export const OrdersFieldsResolvers = [
  OrderReferenceResolver,
  OrderAppResolver,
  OrderCartResolver,
  OrderCurrencyResolver,
  OrderCustomerResolver,
  OrderOrderItemsResolver,
  OrderCreatedByResolver,
  OrderUpdatedByResolver
];
