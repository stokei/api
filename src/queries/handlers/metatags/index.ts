import { FindAllMetatagsQueryHandler } from './find-all-metatags';
import { FindMetatagByIdQueryHandler } from './find-metatag-by-id';

export const MetatagQueriesHandlers = [
  FindMetatagByIdQueryHandler,
  FindAllMetatagsQueryHandler
];
