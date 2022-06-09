import { CreateOrdersAddressService } from './create-orders-address';
import { FindAllOrdersAddressesService } from './find-all-orders-addresses';
import { FindOrdersAddressByIdService } from './find-orders-address-by-id';
import { RemoveOrdersAddressService } from './remove-orders-address';
import { UpdateOrdersAddressService } from './update-orders-address';

export const OrdersAddressServices = [
  CreateOrdersAddressService,
  RemoveOrdersAddressService,
  UpdateOrdersAddressService,
  FindOrdersAddressByIdService,
  FindAllOrdersAddressesService
];
