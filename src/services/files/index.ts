import { FindFileByIdService } from './find-file-by-id';
import { FindAllFilesService } from './find-all-files';
import { CreateFileService } from './create-file';
import { RemoveFileService } from './remove-file';
import { UpdateFileService } from './update-file';

export const FileServices = [
  CreateFileService,
  RemoveFileService,
  UpdateFileService,
  FindFileByIdService,
  FindAllFilesService
];
