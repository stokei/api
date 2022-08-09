import { PaymentMethodAppResolver } from './app';
import { PaymentMethodReferenceResolver } from './reference';

export const PaymentMethodsFieldsResolvers = [
  PaymentMethodReferenceResolver,
  PaymentMethodAppResolver
];
