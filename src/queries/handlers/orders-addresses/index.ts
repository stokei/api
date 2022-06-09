import { FindAllOrdersAddressesQueryHandler } from './find-all-orders-addresses';
import { FindOrdersAddressByIdQueryHandler } from './find-orders-address-by-id';

export const OrdersAddressQueriesHandlers = [
  FindOrdersAddressByIdQueryHandler,
  FindAllOrdersAddressesQueryHandler
];
