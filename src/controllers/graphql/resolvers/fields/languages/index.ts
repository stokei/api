import { LanguageCreatedByResolver } from './created-by';
import { LanguageIconResolver } from './icon';
import { LanguageReferenceResolver } from './reference';
import { LanguageUpdatedByResolver } from './updated-by';

export const LanguagesFieldsResolvers = [
  LanguageReferenceResolver,
  LanguageIconResolver,
  LanguageCreatedByResolver,
  LanguageUpdatedByResolver
];
