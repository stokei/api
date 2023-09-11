import { FindAllVersionsQueryHandler } from './find-all-versions';
import { FindVersionByIdQueryHandler } from './find-version-by-id';

export const VersionQueriesHandlers = [
  FindVersionByIdQueryHandler,
  FindAllVersionsQueryHandler
];
