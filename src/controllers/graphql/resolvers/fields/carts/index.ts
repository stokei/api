import { CartAppResolver } from './app';
import { CartCreatedByResolver } from './created-by';
import { CartCartItemsResolver } from './items';
import { CartReferenceResolver } from './reference';
import { CartUpdatedByResolver } from './updated-by';

export const CartsFieldsResolvers = [
  CartReferenceResolver,
  CartAppResolver,
  CartCartItemsResolver,
  CartCreatedByResolver,
  CartUpdatedByResolver
];
