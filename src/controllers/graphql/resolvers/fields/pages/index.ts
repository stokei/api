import { PageAppResolver } from './app';
import { PageCreatedByResolver } from './created-by';
import { PageReferenceResolver } from './reference';
import { PageUpdatedByResolver } from './updated-by';

export const PagesFieldsResolvers = [
  PageReferenceResolver,
  PageAppResolver,
  PageCreatedByResolver,
  PageUpdatedByResolver
];
