import { FindOrdersSellerByIdService } from './find-orders-seller-by-id';
import { FindAllOrdersSellersService } from './find-all-orders-sellers';
import { CreateOrdersSellerService } from './create-orders-seller';
import { RemoveOrdersSellerService } from './remove-orders-seller';
import { UpdateOrdersSellerService } from './update-orders-seller';

export const OrdersSellerServices = [
  CreateOrdersSellerService,
  RemoveOrdersSellerService,
  UpdateOrdersSellerService,
  FindOrdersSellerByIdService,
  FindAllOrdersSellersService
];
