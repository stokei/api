import { CountOrdersRepository } from './count-orders';
import { CreateOrderRepository } from './create-order';
import { FindAllOrdersRepository } from './find-all-orders';
import { FindOrderByIdRepository } from './find-order-by-id';

export const OrdersRepositories = [
  CountOrdersRepository,
  CreateOrderRepository,
  FindOrderByIdRepository,
  FindAllOrdersRepository
];
