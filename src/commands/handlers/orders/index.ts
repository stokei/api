import { CreateOrderCommandHandler } from './create-order';
import { RemoveOrderCommandHandler } from './remove-order';
import { UpdateOrderCommandHandler } from './update-order';

export const OrderCommandHandlers = [
  CreateOrderCommandHandler,
  RemoveOrderCommandHandler,
  UpdateOrderCommandHandler
];
