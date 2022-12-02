import { FeatureAppResolver } from './app';
import { FeatureCreatedByResolver } from './created-by';
import { FeatureReferenceResolver } from './reference';
import { FeatureUpdatedByResolver } from './updated-by';

export const FeaturesFieldsResolvers = [
  FeatureReferenceResolver,
  FeatureAppResolver,
  FeatureCreatedByResolver,
  FeatureUpdatedByResolver
];
