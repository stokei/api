import { ActivateOrderSubscriptionContractsCommandHandler } from './activate-order-subscription-contracts';
import { CancelOrderSubscriptionContractsCommandHandler } from './cancel-order-subscription-contracts';
import { ChangeOrderToPaidCommandHandler } from './change-order-to-paid';
import { ChangeOrderToPaymentErrorCommandHandler } from './change-order-to-payment-error';
import { CreateOrderCommandHandler } from './create-order';
import { RemoveOrderCommandHandler } from './remove-order';
import { UpdateOrderCommandHandler } from './update-order';

export const OrderCommandHandlers = [
  CreateOrderCommandHandler,
  RemoveOrderCommandHandler,
  UpdateOrderCommandHandler,
  ChangeOrderToPaidCommandHandler,
  ChangeOrderToPaymentErrorCommandHandler,
  ActivateOrderSubscriptionContractsCommandHandler,
  CancelOrderSubscriptionContractsCommandHandler
];
