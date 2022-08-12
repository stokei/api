import { ProductAppResolver } from './app';
import { ProductAvatarResolver } from './avatar';
import { ProductCreatedByResolver } from './created-by';
import { ProductReferenceResolver } from './reference';
import { ProductUpdatedByResolver } from './updated-by';

export const ProductsFieldsResolvers = [
  ProductReferenceResolver,
  ProductAppResolver,
  ProductAvatarResolver,
  ProductCreatedByResolver,
  ProductUpdatedByResolver
];
