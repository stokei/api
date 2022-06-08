import { CreateKeywordResolver } from './create-keyword';
import { RemoveKeywordResolver } from './remove-keyword';
import { UpdateKeywordResolver } from './update-keyword';

export const KeywordsMutations = [
  CreateKeywordResolver,
  RemoveKeywordResolver,
  UpdateKeywordResolver
];
