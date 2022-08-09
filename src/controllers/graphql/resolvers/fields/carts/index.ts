import { CartAppResolver } from './app';
import { CartCreatedByResolver } from './created-by';
import { CartReferenceResolver } from './reference';
import { CartUpdatedByResolver } from './updated-by';

export const CartsFieldsResolvers = [
  CartReferenceResolver,
  CartAppResolver,
  CartCreatedByResolver,
  CartUpdatedByResolver
];
