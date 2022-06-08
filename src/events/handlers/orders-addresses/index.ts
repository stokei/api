import { OrdersAddressCreatedHandler } from './orders-address-created.handler';
import { OrdersAddressUpdatedHandler } from './orders-address-updated.handler';
import { OrdersAddressRemovedHandler } from './orders-address-removed.handler';

export const OrdersAddressEventsHandlers = [
  OrdersAddressCreatedHandler,
  OrdersAddressUpdatedHandler,
  OrdersAddressRemovedHandler
];
