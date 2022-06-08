import { CountOrdersItemsRepository } from './count-orders-items';
import { CreateOrdersItemRepository } from './create-orders-item';
import { ExistsOrdersItemsRepository } from './exists-orders-items';
import { FindOrdersItemByIdRepository } from './find-orders-item-by-id';
import { FindAllOrdersItemsRepository } from './find-all-orders-items';
import { RemoveOrdersItemRepository } from './remove-orders-item';
import { UpdateOrdersItemRepository } from './update-orders-item';

export const OrdersItemsRepositories = [
  CountOrdersItemsRepository,
  CreateOrdersItemRepository,
  ExistsOrdersItemsRepository,
  FindOrdersItemByIdRepository,
  FindAllOrdersItemsRepository,
  RemoveOrdersItemRepository,
  UpdateOrdersItemRepository
];
