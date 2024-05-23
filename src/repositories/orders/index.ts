import { ChangeOrderToPaidRepository } from './change-order-to-paid';
import { ChangeOrderToPaymentErrorRepository } from './change-order-to-payment-error';
import { ChangeOrderToPendingRepository } from './change-order-to-pending';
import { CountOrdersRepository } from './count-orders';
import { CreateOrderRepository } from './create-order';
import { FindAllOrdersRepository } from './find-all-orders';
import { FindOrderByIdRepository } from './find-order-by-id';
import { FindOrdersFrequencyByPeriodRepository } from './find-orders-frequency-by-period';
import { RemoveOrderRepository } from './remove-order';
import { UpdateOrderRepository } from './update-order';

export const OrdersRepositories = [
  CountOrdersRepository,
  CreateOrderRepository,
  FindOrderByIdRepository,
  FindAllOrdersRepository,
  RemoveOrderRepository,
  UpdateOrderRepository,
  ChangeOrderToPaidRepository,
  ChangeOrderToPaymentErrorRepository,
  ChangeOrderToPendingRepository,
  FindOrdersFrequencyByPeriodRepository
];
