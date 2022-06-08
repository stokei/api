import { CountOrdersRepository } from './count-orders';
import { CreateOrderRepository } from './create-order';
import { ExistsOrdersRepository } from './exists-orders';
import { FindOrderByIdRepository } from './find-order-by-id';
import { FindAllOrdersRepository } from './find-all-orders';
import { RemoveOrderRepository } from './remove-order';
import { UpdateOrderRepository } from './update-order';

export const OrdersRepositories = [
  CountOrdersRepository,
  CreateOrderRepository,
  ExistsOrdersRepository,
  FindOrderByIdRepository,
  FindAllOrdersRepository,
  RemoveOrderRepository,
  UpdateOrderRepository
];
