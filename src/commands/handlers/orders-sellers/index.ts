import { CreateOrdersSellerCommandHandler } from './create-orders-seller';
import { RemoveOrdersSellerCommandHandler } from './remove-orders-seller';
import { UpdateOrdersSellerCommandHandler } from './update-orders-seller';

export const OrdersSellerCommandHandlers = [
  CreateOrdersSellerCommandHandler,
  RemoveOrdersSellerCommandHandler,
  UpdateOrdersSellerCommandHandler
];
