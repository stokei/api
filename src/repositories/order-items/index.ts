import { CountOrderItemsRepository } from './count-order-items';
import { CreateOrderItemRepository } from './create-order-item';
import { FindAllOrderItemsRepository } from './find-all-order-items';
import { FindOrderItemByIdRepository } from './find-order-item-by-id';
import { RemoveOrderItemRepository } from './remove-order-item';
import { UpdateOrderItemRepository } from './update-order-item';

export const OrderItemsRepositories = [
  CountOrderItemsRepository,
  CreateOrderItemRepository,
  FindOrderItemByIdRepository,
  FindAllOrderItemsRepository,
  RemoveOrderItemRepository,
  UpdateOrderItemRepository
];
