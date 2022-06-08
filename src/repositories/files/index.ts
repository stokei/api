import { CountFilesRepository } from './count-files';
import { CreateFileRepository } from './create-file';
import { ExistsFilesRepository } from './exists-files';
import { FindFileByIdRepository } from './find-file-by-id';
import { FindAllFilesRepository } from './find-all-files';
import { RemoveFileRepository } from './remove-file';
import { UpdateFileRepository } from './update-file';

export const FilesRepositories = [
  CountFilesRepository,
  CreateFileRepository,
  ExistsFilesRepository,
  FindFileByIdRepository,
  FindAllFilesRepository,
  RemoveFileRepository,
  UpdateFileRepository
];
