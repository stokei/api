import { CreatePaymentMethodResolver } from './create-payment-method';
import { RemovePaymentMethodResolver } from './remove-payment-method';

export const PaymentMethodsMutations = [
  CreatePaymentMethodResolver,
  RemovePaymentMethodResolver
];
