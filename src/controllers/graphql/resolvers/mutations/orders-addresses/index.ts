import { CreateOrdersAddressResolver } from './create-orders-address';
import { RemoveOrdersAddressResolver } from './remove-orders-address';
import { UpdateOrdersAddressResolver } from './update-orders-address';

export const OrdersAddressesMutations = [
  CreateOrdersAddressResolver,
  RemoveOrdersAddressResolver,
  UpdateOrdersAddressResolver
];
