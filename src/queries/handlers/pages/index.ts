import { FindAllPagesQueryHandler } from './find-all-pages';
import { FindPageByIdQueryHandler } from './find-page-by-id';
import { FindPageBySlugAndParentQueryHandler } from './find-page-by-slug-and-parent';

export const PageQueriesHandlers = [
  FindPageByIdQueryHandler,
  FindAllPagesQueryHandler,
  FindPageBySlugAndParentQueryHandler
];
