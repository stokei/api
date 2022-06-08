import { CreateOrderResolver } from './create-order';
import { RemoveOrderResolver } from './remove-order';
import { UpdateOrderResolver } from './update-order';

export const OrdersMutations = [
  CreateOrderResolver,
  RemoveOrderResolver,
  UpdateOrderResolver
];
