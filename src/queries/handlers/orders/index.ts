import { FindOrderByIdQueryHandler } from './find-order-by-id';
import { FindAllOrdersQueryHandler } from './find-all-orders';

export const OrderQueriesHandlers = [
  FindOrderByIdQueryHandler,
  FindAllOrdersQueryHandler
];
