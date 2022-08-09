import { CartItemAppResolver } from './app';
import { CartItemReferenceResolver } from './reference';

export const CartItemsFieldsResolvers = [
  CartItemReferenceResolver,
  CartItemAppResolver
];
