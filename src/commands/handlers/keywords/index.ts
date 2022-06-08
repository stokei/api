import { CreateKeywordCommandHandler } from './create-keyword';
import { RemoveKeywordCommandHandler } from './remove-keyword';
import { UpdateKeywordCommandHandler } from './update-keyword';

export const KeywordCommandHandlers = [
  CreateKeywordCommandHandler,
  RemoveKeywordCommandHandler,
  UpdateKeywordCommandHandler
];
