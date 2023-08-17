import { PaymentAppResolver } from './app';
import { PaymentCreatedByResolver } from './created-by';
import { PaymentCurrencyResolver } from './currency';
import { PaymentPaymentMethodResolver } from './payment-method';
import { PaymentReferenceResolver } from './reference';
import { PaymentUpdatedByResolver } from './updated-by';

export const PaymentsFieldsResolvers = [
  PaymentReferenceResolver,
  PaymentAppResolver,
  PaymentCreatedByResolver,
  PaymentUpdatedByResolver,
  PaymentCurrencyResolver,
  PaymentPaymentMethodResolver
];
