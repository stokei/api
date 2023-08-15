import { FindAllPaymentsQueryHandler } from './find-all-payments';
import { FindPaymentByIdQueryHandler } from './find-payment-by-id';

export const PaymentQueriesHandlers = [
  FindPaymentByIdQueryHandler,
  FindAllPaymentsQueryHandler
];
