import { FindAllPaymentMethodsQueryHandler } from './find-all-payment-methods';
import { FindPaymentMethodByIdQueryHandler } from './find-payment-method-by-id';
import { FindPaymentMethodByStripePaymentMethodQueryHandler } from './find-payment-method-by-stripe-payment-method';

export const PaymentMethodQueriesHandlers = [
  FindPaymentMethodByIdQueryHandler,
  FindAllPaymentMethodsQueryHandler,
  FindPaymentMethodByStripePaymentMethodQueryHandler
];
