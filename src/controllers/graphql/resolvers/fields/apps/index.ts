import { AppCreatedByResolver } from './created-by';
import { AppReferenceResolver } from './reference';
import { AppUpdatedByResolver } from './updated-by';

export const AppsFieldsResolvers = [
  AppReferenceResolver,
  AppCreatedByResolver,
  AppUpdatedByResolver
];
