import { CreateOrderService } from './create-order';
import { FindAllOrdersService } from './find-all-orders';
import { FindOrderByIdService } from './find-order-by-id';

export const OrderServices = [
  CreateOrderService,
  FindOrderByIdService,
  FindAllOrdersService
];
