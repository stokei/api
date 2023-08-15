import { CreateOrderItemCommandHandler } from './create-order-item';
import { RemoveOrderItemCommandHandler } from './remove-order-item';
import { UpdateOrderItemCommandHandler } from './update-order-item';

export const OrderItemCommandHandlers = [
  CreateOrderItemCommandHandler,
  RemoveOrderItemCommandHandler,
  UpdateOrderItemCommandHandler
];
