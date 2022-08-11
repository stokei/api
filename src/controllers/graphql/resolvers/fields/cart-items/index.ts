import { CartItemAppResolver } from './app';
import { CartItemCreatedByResolver } from './created-by';
import { CartItemPriceResolver } from './price';
import { CartItemProductResolver } from './product';
import { CartItemReferenceResolver } from './reference';
import { CartItemUpdatedByResolver } from './updated-by';

export const CartItemsFieldsResolvers = [
  CartItemReferenceResolver,
  CartItemAppResolver,
  CartItemProductResolver,
  CartItemPriceResolver,
  CartItemCreatedByResolver,
  CartItemUpdatedByResolver
];
