import { CreateOrdersSellerResolver } from './create-orders-seller';
import { RemoveOrdersSellerResolver } from './remove-orders-seller';
import { UpdateOrdersSellerResolver } from './update-orders-seller';

export const OrdersSellersMutations = [
  CreateOrdersSellerResolver,
  RemoveOrdersSellerResolver,
  UpdateOrdersSellerResolver
];
