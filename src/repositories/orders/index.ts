import { CountOrdersRepository } from './count-orders';
import { CreateOrderRepository } from './create-order';
import { ExistsOrdersRepository } from './exists-orders';
import { FindAllOrdersRepository } from './find-all-orders';
import { FindOrderByIdRepository } from './find-order-by-id';
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
