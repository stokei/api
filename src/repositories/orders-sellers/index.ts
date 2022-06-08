import { CountOrdersSellersRepository } from './count-orders-sellers';
import { CreateOrdersSellerRepository } from './create-orders-seller';
import { ExistsOrdersSellersRepository } from './exists-orders-sellers';
import { FindOrdersSellerByIdRepository } from './find-orders-seller-by-id';
import { FindAllOrdersSellersRepository } from './find-all-orders-sellers';
import { RemoveOrdersSellerRepository } from './remove-orders-seller';
import { UpdateOrdersSellerRepository } from './update-orders-seller';

export const OrdersSellersRepositories = [
  CountOrdersSellersRepository,
  CreateOrdersSellerRepository,
  ExistsOrdersSellersRepository,
  FindOrdersSellerByIdRepository,
  FindAllOrdersSellersRepository,
  RemoveOrdersSellerRepository,
  UpdateOrdersSellerRepository
];
