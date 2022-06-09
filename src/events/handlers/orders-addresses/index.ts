import { OrdersAddressCreatedHandler } from './orders-address-created.handler';
import { OrdersAddressRemovedHandler } from './orders-address-removed.handler';
import { OrdersAddressUpdatedHandler } from './orders-address-updated.handler';

export const OrdersAddressEventsHandlers = [
  OrdersAddressCreatedHandler,
  OrdersAddressUpdatedHandler,
  OrdersAddressRemovedHandler
];
