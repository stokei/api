import { AddressAppResolver } from './app';
import { AddressReferenceResolver } from './reference';

export const AddressesFieldsResolvers = [
  AddressReferenceResolver,
  AddressAppResolver
];
