import { FindAllOrdersSellersQueryHandler } from './find-all-orders-sellers';
import { FindOrdersSellerByIdQueryHandler } from './find-orders-seller-by-id';

export const OrdersSellerQueriesHandlers = [
  FindOrdersSellerByIdQueryHandler,
  FindAllOrdersSellersQueryHandler
];
