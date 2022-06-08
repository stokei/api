import { FindPaymentByIdQueryHandler } from './find-payment-by-id';
import { FindAllPaymentsQueryHandler } from './find-all-payments';

export const PaymentQueriesHandlers = [
  FindPaymentByIdQueryHandler,
  FindAllPaymentsQueryHandler
];
