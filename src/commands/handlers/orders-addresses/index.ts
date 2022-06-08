import { CreateOrdersAddressCommandHandler } from './create-orders-address';
import { RemoveOrdersAddressCommandHandler } from './remove-orders-address';
import { UpdateOrdersAddressCommandHandler } from './update-orders-address';

export const OrdersAddressCommandHandlers = [
  CreateOrdersAddressCommandHandler,
  RemoveOrdersAddressCommandHandler,
  UpdateOrdersAddressCommandHandler
];
