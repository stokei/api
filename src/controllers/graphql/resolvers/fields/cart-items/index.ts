import { CartItemAppResolver } from './app';
import { CartItemCreatedByResolver } from './created-by';
import { CartItemReferenceResolver } from './reference';
import { CartItemUpdatedByResolver } from './updated-by';

export const CartItemsFieldsResolvers = [
  CartItemReferenceResolver,
  CartItemAppResolver,
  CartItemCreatedByResolver,
  CartItemUpdatedByResolver
];
