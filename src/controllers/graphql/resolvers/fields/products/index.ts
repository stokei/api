import { ProductAppResolver } from './app';
import { ProductCreatedByResolver } from './created-by';
import { ProductReferenceResolver } from './reference';
import { ProductUpdatedByResolver } from './updated-by';

export const ProductsFieldsResolvers = [
  ProductReferenceResolver,
  ProductAppResolver,
  ProductCreatedByResolver,
  ProductUpdatedByResolver
];
