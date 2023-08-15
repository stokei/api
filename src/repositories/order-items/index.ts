import { CountOrderItemsRepository } from './count-order-items';
import { CreateOrderItemRepository } from './create-order-item';
import { FindAllOrderItemsRepository } from './find-all-order-items';
import { FindOrderItemByIdRepository } from './find-order-item-by-id';

export const OrderItemsRepositories = [
  CountOrderItemsRepository,
  CreateOrderItemRepository,
  FindOrderItemByIdRepository,
  FindAllOrderItemsRepository
];
