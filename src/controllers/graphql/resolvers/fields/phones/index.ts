import { PhoneAppResolver } from './app';
import { PhoneCreatedByResolver } from './created-by';
import { PhoneReferenceResolver } from './reference';
import { PhoneUpdatedByResolver } from './updated-by';

export const PhonesFieldsResolvers = [
  PhoneReferenceResolver,
  PhoneAppResolver,
  PhoneCreatedByResolver,
  PhoneUpdatedByResolver
];
