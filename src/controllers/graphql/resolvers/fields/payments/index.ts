import { PaymentAppResolver } from './app';
import { PaymentCreatedByResolver } from './created-by';
import { PaymentReferenceResolver } from './reference';
import { PaymentUpdatedByResolver } from './updated-by';

export const PaymentsFieldsResolvers = [
  PaymentReferenceResolver,
  PaymentAppResolver,
  PaymentCreatedByResolver,
  PaymentUpdatedByResolver
];
