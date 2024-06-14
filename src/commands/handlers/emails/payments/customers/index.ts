import { SendPaymentsCustomersPaymentErrorEmailCommandHandler } from './send-payment-error-email';
import { SendPaymentsCustomersPaymentSuccessfullyEmailCommandHandler } from './send-payment-successfully-email';

export const PaymentsCustomersEmailCommandHandlers = [
  SendPaymentsCustomersPaymentErrorEmailCommandHandler,
  SendPaymentsCustomersPaymentSuccessfullyEmailCommandHandler
];
