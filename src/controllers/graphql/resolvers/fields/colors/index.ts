import { ColorAppResolver } from './app';
import { ColorCreatedByResolver } from './created-by';
import { ColorReferenceResolver } from './reference';
import { ColorUpdatedByResolver } from './updated-by';

export const ColorsFieldsResolvers = [
  ColorReferenceResolver,
  ColorAppResolver,
  ColorCreatedByResolver,
  ColorUpdatedByResolver
];
