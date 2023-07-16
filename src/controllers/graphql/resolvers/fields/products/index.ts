import { ProductAppResolver } from './app';
import { ProductAvatarResolver } from './avatar';
import { ProductCreatedByResolver } from './created-by';
import { ProductDefaultPriceResolver } from './default-price';
import { ProductFeaturesResolver } from './features';
import { ProductParentResolver } from './parent';
import { ProductParentIdResolver } from './parent-id';
import { ProductPricesResolver } from './prices';
import { ProductReferenceResolver } from './reference';
import { ProductUpdatedByResolver } from './updated-by';

export const ProductsFieldsResolvers = [
  ProductReferenceResolver,
  ProductAppResolver,
  ProductAvatarResolver,
  ProductCreatedByResolver,
  ProductUpdatedByResolver,
  ProductPricesResolver,
  ProductParentResolver,
  ProductDefaultPriceResolver,
  ProductFeaturesResolver,
  ProductParentIdResolver
];
