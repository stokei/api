import { OrdersSellerCreatedHandler } from './orders-seller-created.handler';
import { OrdersSellerUpdatedHandler } from './orders-seller-updated.handler';
import { OrdersSellerRemovedHandler } from './orders-seller-removed.handler';

export const OrdersSellerEventsHandlers = [
  OrdersSellerCreatedHandler,
  OrdersSellerUpdatedHandler,
  OrdersSellerRemovedHandler
];
