import { FindOrdersItemByIdService } from './find-orders-item-by-id';
import { FindAllOrdersItemsService } from './find-all-orders-items';
import { CreateOrdersItemService } from './create-orders-item';
import { RemoveOrdersItemService } from './remove-orders-item';
import { UpdateOrdersItemService } from './update-orders-item';

export const OrdersItemServices = [
  CreateOrdersItemService,
  RemoveOrdersItemService,
  UpdateOrdersItemService,
  FindOrdersItemByIdService,
  FindAllOrdersItemsService
];
