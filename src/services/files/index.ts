import { CreateFileService } from './create-file';
import { FindAllFilesService } from './find-all-files';
import { FindFileByIdService } from './find-file-by-id';
import { RemoveFileService } from './remove-file';
import { UpdateFileService } from './update-file';

export const FileServices = [
  CreateFileService,
  RemoveFileService,
  UpdateFileService,
  FindFileByIdService,
  FindAllFilesService
];
