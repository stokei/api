import { ProductAppResolver } from './app';
import { ProductAvatarResolver } from './avatar';
import { ProductComboResolver } from './combo';
import { ProductCreatedByResolver } from './created-by';
import { ProductDefaultPriceResolver } from './default-price';
import { ProductExternalReferenceResolver } from './external-reference';
import { ProductExternalReferenceIdResolver } from './external-reference-id';
import { ProductFeaturesResolver } from './features';
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
  ProductExternalReferenceResolver,
  ProductExternalReferenceIdResolver,
  ProductDefaultPriceResolver,
  ProductFeaturesResolver,
  ProductComboResolver
];
