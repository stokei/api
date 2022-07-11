import { FindAllPaymentMethodsQueryHandler } from './find-all-payment-methods';
import { FindPaymentMethodByIdQueryHandler } from './find-payment-method-by-id';

export const PaymentMethodQueriesHandlers = [
  FindPaymentMethodByIdQueryHandler,
  FindAllPaymentMethodsQueryHandler
];
