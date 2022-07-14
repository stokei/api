import { CreateOrderItemService } from './create-order-item';
import { FindAllOrderItemsService } from './find-all-order-items';
import { FindOrderItemByIdService } from './find-order-item-by-id';
import { RemoveOrderItemService } from './remove-order-item';

export const OrderItemServices = [
  CreateOrderItemService,
  RemoveOrderItemService,
  FindOrderItemByIdService,
  FindAllOrderItemsService
];
