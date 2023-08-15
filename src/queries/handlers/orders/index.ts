import { FindAllOrdersQueryHandler } from './find-all-orders';
import { FindOrderByIdQueryHandler } from './find-order-by-id';

export const OrderQueriesHandlers = [
  FindOrderByIdQueryHandler,
  FindAllOrdersQueryHandler
];
