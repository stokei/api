import { CreateOrderItemCommandHandler } from './create-order-item';
import { RemoveOrderItemCommandHandler } from './remove-order-item';

export const OrderItemCommandHandlers = [
  CreateOrderItemCommandHandler,
  RemoveOrderItemCommandHandler
];
