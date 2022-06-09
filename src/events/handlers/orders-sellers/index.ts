import { OrdersSellerCreatedHandler } from './orders-seller-created.handler';
import { OrdersSellerRemovedHandler } from './orders-seller-removed.handler';
import { OrdersSellerUpdatedHandler } from './orders-seller-updated.handler';

export const OrdersSellerEventsHandlers = [
  OrdersSellerCreatedHandler,
  OrdersSellerUpdatedHandler,
  OrdersSellerRemovedHandler
];
