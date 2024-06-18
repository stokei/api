import { AuthCustomersEmailCommandHandlers } from './auth/customers';
import { AuthSellersEmailCommandHandlers } from './auth/sellers';
import { OrdersCustomersEmailCommandHandlers } from './orders/customers';
import { OrdersSellersEmailCommandHandlers } from './orders/sellers';
import { PaymentsCustomersEmailCommandHandlers } from './payments/customers';
import { PaymentsSellersEmailCommandHandlers } from './payments/sellers';
import { SendEmailCommandHandler } from './send-email';
import { SubscriptionsCustomersEmailCommandHandlers } from './subscriptions/customers';
import { SubscriptionsSellersEmailCommandHandlers } from './subscriptions/sellers';

export const EmailCommandHandlers = [
  SendEmailCommandHandler,
  ...AuthCustomersEmailCommandHandlers,
  ...AuthSellersEmailCommandHandlers,
  ...OrdersCustomersEmailCommandHandlers,
  ...OrdersSellersEmailCommandHandlers,
  ...PaymentsCustomersEmailCommandHandlers,
  ...PaymentsSellersEmailCommandHandlers,
  ...SubscriptionsCustomersEmailCommandHandlers,
  ...SubscriptionsSellersEmailCommandHandlers
];
