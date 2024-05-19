import { PaymentMethodResolver } from './payment-method';
import { PaymentMethodsResolver } from './payment-methods';
import { PaymentMethodsMostUsedByPeriodResolver } from './payment-methods-most-used';

export const PaymentMethodsQueries = [
  PaymentMethodResolver,
  PaymentMethodsResolver,
  PaymentMethodsMostUsedByPeriodResolver
];
