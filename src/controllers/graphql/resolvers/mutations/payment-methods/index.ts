import { CreatePaymentMethodCardResolver } from './create-payment-method-card';
import { RemovePaymentMethodResolver } from './remove-payment-method';

export const PaymentMethodsMutations = [
  CreatePaymentMethodCardResolver,
  RemovePaymentMethodResolver
];
