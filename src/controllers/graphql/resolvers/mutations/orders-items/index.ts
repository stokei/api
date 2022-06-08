import { CreateOrdersItemResolver } from './create-orders-item';
import { RemoveOrdersItemResolver } from './remove-orders-item';
import { UpdateOrdersItemResolver } from './update-orders-item';

export const OrdersItemsMutations = [
  CreateOrdersItemResolver,
  RemoveOrdersItemResolver,
  UpdateOrdersItemResolver
];
