import { OrderResolver } from './order';
import { OrdersResolver } from './orders';
import { OrdersFrequencyByPeriodResolver } from './orders-frequency-by-period';

export const OrdersQueries = [
  OrderResolver,
  OrdersResolver,
  OrdersFrequencyByPeriodResolver
];
