import { FindAllOrdersQueryHandler } from './find-all-orders';
import { FindOrderByIdQueryHandler } from './find-order-by-id';
import { FindOrdersFrequencyByPeriodQueryHandler } from './find-orders-frequency-by-period';

export const OrderQueriesHandlers = [
  FindOrderByIdQueryHandler,
  FindAllOrdersQueryHandler,
  FindOrdersFrequencyByPeriodQueryHandler
];
