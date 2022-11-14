import { ActivateFileCommandHandler } from './activate-file';
import { AddFileToAppSubscriptionContractCommandHandler } from './add-file-to-app-subscription-contract';
import { CreateFileCommandHandler } from './create-file';
import { CreateVideoUploadURLCommandHandler } from './create-video-upload-url';
import { RemoveFileCommandHandler } from './remove-file';
import { RemoveFileFromAppSubscriptionContractCommandHandler } from './remove-file-from-app-subscription-contract';
import { UpdateFileCommandHandler } from './update-file';

export const FileCommandHandlers = [
  CreateFileCommandHandler,
  RemoveFileCommandHandler,
  UpdateFileCommandHandler,
  ActivateFileCommandHandler,
  AddFileToAppSubscriptionContractCommandHandler,
  RemoveFileFromAppSubscriptionContractCommandHandler,
  CreateVideoUploadURLCommandHandler
];
