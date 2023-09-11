import { FindAllPagesQueryHandler } from './find-all-pages';
import { FindPageByIdQueryHandler } from './find-page-by-id';

export const PageQueriesHandlers = [
  FindPageByIdQueryHandler,
  FindAllPagesQueryHandler
];
