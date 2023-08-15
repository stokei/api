import { CreateOrderService } from './create-order';
import { FindAllOrdersService } from './find-all-orders';
import { FindOrderByIdService } from './find-order-by-id';
import { RemoveOrderService } from './remove-order';
import { UpdateOrderService } from './update-order';

export const OrderServices = [
  CreateOrderService,
  RemoveOrderService,
  UpdateOrderService,
  FindOrderByIdService,
  FindAllOrdersService
];
