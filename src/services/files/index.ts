import { ActivateFileService } from './activate-file';
import { CreateFileService } from './create-file';
import { CreateVideoUploadURLService } from './create-video-upload-url';
import { FindAllFilesService } from './find-all-files';
import { FindFileByFilenameService } from './find-file-by-filename';
import { FindFileByIdService } from './find-file-by-id';
import { RemoveFileService } from './remove-file';
import { UpdateFileService } from './update-file';

export const FileServices = [
  CreateFileService,
  RemoveFileService,
  UpdateFileService,
  FindFileByIdService,
  FindAllFilesService,
  CreateVideoUploadURLService,
  FindFileByFilenameService,
  ActivateFileService
];
