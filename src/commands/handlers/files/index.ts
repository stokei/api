import { ActivateFileCommandHandler } from './activate-file';
import { AddFileToAppSubscriptionContractCommandHandler } from './add-file-to-app-subscription-contract';
import { AddVideoFileToAppSubscriptionContractCommandHandler } from './add-video-file-to-app-subscription-contract';
import { CreateFileCommandHandler } from './create-file';
import { CreateImageUploadURLCommandHandler } from './create-image-upload-url';
import { CreateVideoUploadURLCommandHandler } from './create-video-upload-url';
import { RemoveFileCommandHandler } from './remove-file';
import { RemoveFileFromAppSubscriptionContractCommandHandler } from './remove-file-from-app-subscription-contract';
import { RemoveVideoFromAppSubscriptionContractCommandHandler } from './remove-video-from-app-subscription-contract';
import { UpdateFileCommandHandler } from './update-file';

export const FileCommandHandlers = [
  CreateFileCommandHandler,
  RemoveFileCommandHandler,
  UpdateFileCommandHandler,
  ActivateFileCommandHandler,
  AddFileToAppSubscriptionContractCommandHandler,
  AddVideoFileToAppSubscriptionContractCommandHandler,
  CreateVideoUploadURLCommandHandler,
  CreateImageUploadURLCommandHandler,
  RemoveFileFromAppSubscriptionContractCommandHandler,
  RemoveVideoFromAppSubscriptionContractCommandHandler
];
