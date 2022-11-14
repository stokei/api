import { FindAllFilesQueryHandler } from './find-all-files';
import { FindFileByFilenameQueryHandler } from './find-file-by-filename';
import { FindFileByIdQueryHandler } from './find-file-by-id';

export const FileQueriesHandlers = [
  FindFileByIdQueryHandler,
  FindAllFilesQueryHandler,
  FindFileByFilenameQueryHandler
];
