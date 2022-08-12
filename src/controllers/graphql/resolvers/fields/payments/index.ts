import { PaymentAppResolver } from './app';
import { PaymentCreatedByResolver } from './created-by';
import { PaymentCustomerResolver } from './customer';
import { PaymentOrderResolver } from './order';
import { PaymentPaymentMethodResolver } from './payment-method';
import { PaymentReferenceResolver } from './reference';
import { PaymentUpdatedByResolver } from './updated-by';

export const PaymentsFieldsResolvers = [
  PaymentReferenceResolver,
  PaymentAppResolver,
  PaymentCustomerResolver,
  PaymentOrderResolver,
  PaymentPaymentMethodResolver,
  PaymentCreatedByResolver,
  PaymentUpdatedByResolver
];
