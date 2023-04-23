import { ActivateFileRepository } from './activate-file';
import { CountFilesRepository } from './count-files';
import { CreateFileRepository } from './create-file';
import { FindAllFilesRepository } from './find-all-files';
import { FindFileByFilenameRepository } from './find-file-by-filename';
import { FindFileByIdRepository } from './find-file-by-id';
import { RemoveFileRepository } from './remove-file';
import { UpdateFileRepository } from './update-file';

export const FilesRepositories = [
  CountFilesRepository,
  CreateFileRepository,
  FindFileByIdRepository,
  FindAllFilesRepository,
  RemoveFileRepository,
  UpdateFileRepository,
  ActivateFileRepository,
  FindFileByFilenameRepository
];
