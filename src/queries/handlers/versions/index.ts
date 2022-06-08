import { FindVersionByIdQueryHandler } from './find-version-by-id';
import { FindAllVersionsQueryHandler } from './find-all-versions';

export const VersionQueriesHandlers = [
  FindVersionByIdQueryHandler,
  FindAllVersionsQueryHandler
];
