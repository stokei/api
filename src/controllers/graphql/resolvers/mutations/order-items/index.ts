import { CreateOrderItemResolver } from './create-order-item';
import { RemoveOrderItemResolver } from './remove-order-item';
import { UpdateOrderItemResolver } from './update-order-item';

export const OrderItemsMutations = [
  CreateOrderItemResolver,
  RemoveOrderItemResolver,
  UpdateOrderItemResolver
];
