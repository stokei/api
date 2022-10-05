import { CountFilesRepository } from './count-files';
import { CreateFileRepository } from './create-file';
import { FindAllFilesRepository } from './find-all-files';
import { FindFileByIdRepository } from './find-file-by-id';
import { RemoveFileRepository } from './remove-file';
import { StartFileEncodingRepository } from './start-file-encoding';
import { UpdateFileRepository } from './update-file';

export const FilesRepositories = [
  CountFilesRepository,
  CreateFileRepository,
  FindFileByIdRepository,
  FindAllFilesRepository,
  RemoveFileRepository,
  UpdateFileRepository,
  StartFileEncodingRepository
];
