import { CreateOrdersItemCommandHandler } from './create-orders-item';
import { RemoveOrdersItemCommandHandler } from './remove-orders-item';
import { UpdateOrdersItemCommandHandler } from './update-orders-item';

export const OrdersItemCommandHandlers = [
  CreateOrdersItemCommandHandler,
  RemoveOrdersItemCommandHandler,
  UpdateOrdersItemCommandHandler
];
