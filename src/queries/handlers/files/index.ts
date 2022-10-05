import { FindAllFilesQueryHandler } from './find-all-files';
import { FindFileByIdQueryHandler } from './find-file-by-id';

export const FileQueriesHandlers = [
  FindFileByIdQueryHandler,
  FindAllFilesQueryHandler
];
