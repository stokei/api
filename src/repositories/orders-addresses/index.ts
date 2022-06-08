import { CountOrdersAddressesRepository } from './count-orders-addresses';
import { CreateOrdersAddressRepository } from './create-orders-address';
import { ExistsOrdersAddressesRepository } from './exists-orders-addresses';
import { FindOrdersAddressByIdRepository } from './find-orders-address-by-id';
import { FindAllOrdersAddressesRepository } from './find-all-orders-addresses';
import { RemoveOrdersAddressRepository } from './remove-orders-address';
import { UpdateOrdersAddressRepository } from './update-orders-address';

export const OrdersAddressesRepositories = [
  CountOrdersAddressesRepository,
  CreateOrdersAddressRepository,
  ExistsOrdersAddressesRepository,
  FindOrdersAddressByIdRepository,
  FindAllOrdersAddressesRepository,
  RemoveOrdersAddressRepository,
  UpdateOrdersAddressRepository
];
