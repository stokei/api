import { PaymentMethodAppResolver } from './app';
import { PaymentMethodCreatedByResolver } from './created-by';
import { PaymentMethodParentResolver } from './parent';
import { PaymentMethodReferenceResolver } from './reference';
import { PaymentMethodUpdatedByResolver } from './updated-by';

export const PaymentMethodsFieldsResolvers = [
  PaymentMethodReferenceResolver,
  PaymentMethodAppResolver,
  PaymentMethodParentResolver,
  PaymentMethodCreatedByResolver,
  PaymentMethodUpdatedByResolver
];
