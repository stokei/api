import { ProductAppResolver } from './app';
import { ProductReferenceResolver } from './reference';

export const ProductsFieldsResolvers = [
  ProductReferenceResolver,
  ProductAppResolver
];
