import { LanguageCreatedByResolver } from './created-by';
import { LanguageReferenceResolver } from './reference';
import { LanguageUpdatedByResolver } from './updated-by';

export const LanguagesFieldsResolvers = [
  LanguageReferenceResolver,
  LanguageCreatedByResolver,
  LanguageUpdatedByResolver
];
