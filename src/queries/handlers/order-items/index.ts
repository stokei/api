import { FindAllOrderItemsQueryHandler } from './find-all-order-items';
import { FindOrderItemByIdQueryHandler } from './find-order-item-by-id';

export const OrderItemQueriesHandlers = [
  FindOrderItemByIdQueryHandler,
  FindAllOrderItemsQueryHandler
];
