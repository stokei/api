import { CreateLanguageResolver } from './create-language';
import { RemoveLanguageResolver } from './remove-language';
import { UpdateLanguageResolver } from './update-language';

export const LanguagesMutations = [
  CreateLanguageResolver,
  RemoveLanguageResolver,
  UpdateLanguageResolver
];
