import { OrderAppResolver } from './app';
import { OrderCouponResolver } from './coupon';
import { OrderCreatedByResolver } from './created-by';
import { OrderCurrencyResolver } from './currency';
import { OrderItemsResolver } from './items';
import { OrderPaymentsResolver } from './payments';
import { OrderReferenceResolver } from './reference';
import { OrderUpdatedByResolver } from './updated-by';

export const OrdersFieldsResolvers = [
  OrderReferenceResolver,
  OrderAppResolver,
  OrderCreatedByResolver,
  OrderUpdatedByResolver,
  OrderCurrencyResolver,
  OrderItemsResolver,
  OrderPaymentsResolver,
  OrderCouponResolver
];
