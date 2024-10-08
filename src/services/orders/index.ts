import { ActivateOrderSubscriptionContractsService } from './activate-order-subscription-contracts';
import { CancelOrderSubscriptionContractsService } from './cancel-order-subscription-contracts';
import { ChangeOrderToPaidService } from './change-order-to-paid';
import { ChangeOrderToPaymentErrorService } from './change-order-to-payment-error';
import { ChangeOrderToPendingService } from './change-order-to-pending';
import { CreateOrderService } from './create-order';
import { FindAllOrdersService } from './find-all-orders';
import { FindOrderByIdService } from './find-order-by-id';
import { FindOrdersFrequencyByPeriodService } from './find-orders-frequency-by-period';
import { RemoveOrderService } from './remove-order';
import { UpdateOrderService } from './update-order';

export const OrderServices = [
  CreateOrderService,
  RemoveOrderService,
  UpdateOrderService,
  FindOrderByIdService,
  FindAllOrdersService,
  ChangeOrderToPaidService,
  ChangeOrderToPendingService,
  ChangeOrderToPaymentErrorService,
  ActivateOrderSubscriptionContractsService,
  CancelOrderSubscriptionContractsService,
  FindOrdersFrequencyByPeriodService
];
