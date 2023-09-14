import { FindAllVersionsQueryHandler } from './find-all-versions';
import { FindVersionByIdQueryHandler } from './find-version-by-id';
import { FindVersionWithComponentsQueryHandler } from './find-version-with-components';

export const VersionQueriesHandlers = [
  FindVersionByIdQueryHandler,
  FindAllVersionsQueryHandler,
  FindVersionWithComponentsQueryHandler
];
