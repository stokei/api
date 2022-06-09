import { FindAllOrdersItemsQueryHandler } from './find-all-orders-items';
import { FindOrdersItemByIdQueryHandler } from './find-orders-item-by-id';

export const OrdersItemQueriesHandlers = [
  FindOrdersItemByIdQueryHandler,
  FindAllOrdersItemsQueryHandler
];
