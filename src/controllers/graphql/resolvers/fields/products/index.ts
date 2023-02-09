import { ProductAppResolver } from './app';
import { ProductAvatarResolver } from './avatar';
import { ProductCourseResolver } from './course';
import { ProductCreatedByResolver } from './created-by';
import { ProductDefaultPriceResolver } from './default-price';
import { ProductFeaturesResolver } from './features';
import { ProductPlanResolver } from './plan';
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
  ProductCourseResolver,
  ProductPlanResolver,
  ProductDefaultPriceResolver,
  ProductFeaturesResolver
];
