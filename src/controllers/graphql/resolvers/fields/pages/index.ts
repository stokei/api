import { PageAppResolver } from './app';
import { PageCreatedByResolver } from './created-by';
import { PageDraftVersionResolver } from './draft-version';
import { PageReferenceResolver } from './reference';
import { PageUpdatedByResolver } from './updated-by';
import { PageVersionResolver } from './version';

export const PagesFieldsResolvers = [
  PageReferenceResolver,
  PageAppResolver,
  PageCreatedByResolver,
  PageUpdatedByResolver,
  PageVersionResolver,
  PageDraftVersionResolver
];
