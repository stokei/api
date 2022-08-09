import { AddressAppResolver } from './app';
import { AddressCreatedByResolver } from './created-by';
import { AddressReferenceResolver } from './reference';
import { AddressUpdatedByResolver } from './updated-by';

export const AddressesFieldsResolvers = [
  AddressReferenceResolver,
  AddressAppResolver,
  AddressCreatedByResolver,
  AddressUpdatedByResolver
];
