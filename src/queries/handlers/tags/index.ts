import { FindAllTagsQueryHandler } from './find-all-tags';
import { FindTagByIdQueryHandler } from './find-tag-by-id';

export const TagQueriesHandlers = [
  FindTagByIdQueryHandler,
  FindAllTagsQueryHandler
];
