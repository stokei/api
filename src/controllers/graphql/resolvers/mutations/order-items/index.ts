import { CreateOrderItemResolver } from './create-order-item';
import { RemoveOrderItemResolver } from './remove-order-item';

export const OrderItemsMutations = [
  CreateOrderItemResolver,
  RemoveOrderItemResolver
];
