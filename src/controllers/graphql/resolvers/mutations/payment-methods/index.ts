import { CreatePaymentMethodResolver } from './create-payment-method';
import { RemovePaymentMethodResolver } from './remove-payment-method';
import { UpdatePaymentMethodResolver } from './update-payment-method';

export const PaymentMethodsMutations = [
  CreatePaymentMethodResolver,
  RemovePaymentMethodResolver,
  UpdatePaymentMethodResolver
];
