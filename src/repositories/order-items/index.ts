import { CountOrderItemsRepository } from './count-order-items';
import { CreateOrderItemRepository } from './create-order-item';
import { ExistsOrderItemsRepository } from './exists-order-items';
import { FindAllOrderItemsRepository } from './find-all-order-items';
import { FindOrderItemByIdRepository } from './find-order-item-by-id';

export const OrderItemsRepositories = [
  CountOrderItemsRepository,
  CreateOrderItemRepository,
  ExistsOrderItemsRepository,
  FindOrderItemByIdRepository,
  FindAllOrderItemsRepository
];