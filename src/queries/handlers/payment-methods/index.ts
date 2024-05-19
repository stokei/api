import { FindAllPaymentMethodsQueryHandler } from './find-all-payment-methods';
import { FindPaymentMethodByIdQueryHandler } from './find-payment-method-by-id';
import { FindPaymentMethodsMostUsedByPeriodQueryHandler } from './find-payment-methods-most-used-by-period';

export const PaymentMethodQueriesHandlers = [
  FindPaymentMethodByIdQueryHandler,
  FindAllPaymentMethodsQueryHandler,
  FindPaymentMethodsMostUsedByPeriodQueryHandler
];
