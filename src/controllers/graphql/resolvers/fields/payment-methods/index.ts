import { PaymentMethodAppResolver } from './app';
import { PaymentMethodCreatedByResolver } from './created-by';
import { PaymentMethodReferenceResolver } from './reference';
import { PaymentMethodUpdatedByResolver } from './updated-by';

export const PaymentMethodsFieldsResolvers = [
  PaymentMethodReferenceResolver,
  PaymentMethodAppResolver,
  PaymentMethodCreatedByResolver,
  PaymentMethodUpdatedByResolver
];
