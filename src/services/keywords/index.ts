import { FindKeywordByIdService } from './find-keyword-by-id';
import { FindAllKeywordsService } from './find-all-keywords';
import { CreateKeywordService } from './create-keyword';
import { RemoveKeywordService } from './remove-keyword';
import { UpdateKeywordService } from './update-keyword';

export const KeywordServices = [
  CreateKeywordService,
  RemoveKeywordService,
  UpdateKeywordService,
  FindKeywordByIdService,
  FindAllKeywordsService
];
