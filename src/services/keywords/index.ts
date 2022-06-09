import { CreateKeywordService } from './create-keyword';
import { FindAllKeywordsService } from './find-all-keywords';
import { FindKeywordByIdService } from './find-keyword-by-id';
import { RemoveKeywordService } from './remove-keyword';
import { UpdateKeywordService } from './update-keyword';

export const KeywordServices = [
  CreateKeywordService,
  RemoveKeywordService,
  UpdateKeywordService,
  FindKeywordByIdService,
  FindAllKeywordsService
];
