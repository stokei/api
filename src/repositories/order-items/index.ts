import { CountOrderItemsRepository } from './count-order-items';
import { CreateOrderItemRepository } from './create-order-item';
import { ExistsOrderItemsRepository } from './exists-order-items';
import { FindAllOrderItemsRepository } from './find-all-order-items';
import { FindOrderItemByIdRepository } from './find-order-item-by-id';
import { RemoveOrderItemRepository } from './remove-order-item';
import { UpdateOrderItemRepository } from './update-order-item';

export const OrderItemsRepositories = [
  CountOrderItemsRepository,
  CreateOrderItemRepository,
  ExistsOrderItemsRepository,
  FindOrderItemByIdRepository,
  FindAllOrderItemsRepository,
  RemoveOrderItemRepository,
  UpdateOrderItemRepository
];
