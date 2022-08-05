import { PaymentReferenceResolver } from './reference';

import { PaymentAppResolver } from './app';
import { PaymentReferenceResolver } from './reference';

export const PaymentsFieldsResolvers = [
  PaymentReferenceResolver,
  PaymentAppResolver
];
