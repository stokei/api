import { CountKeywordsRepository } from './count-keywords';
import { CreateKeywordRepository } from './create-keyword';
import { ExistsKeywordsRepository } from './exists-keywords';
import { FindAllKeywordsRepository } from './find-all-keywords';
import { FindKeywordByIdRepository } from './find-keyword-by-id';
import { RemoveKeywordRepository } from './remove-keyword';
import { UpdateKeywordRepository } from './update-keyword';

export const KeywordsRepositories = [
  CountKeywordsRepository,
  CreateKeywordRepository,
  ExistsKeywordsRepository,
  FindKeywordByIdRepository,
  FindAllKeywordsRepository,
  RemoveKeywordRepository,
  UpdateKeywordRepository
];
