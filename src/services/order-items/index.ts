import { CreateOrderItemService } from './create-order-item';
import { FindAllOrderItemsService } from './find-all-order-items';
import { FindOrderItemByIdService } from './find-order-item-by-id';

export const OrderItemServices = [
  CreateOrderItemService,
  FindOrderItemByIdService,
  FindAllOrderItemsService
];
