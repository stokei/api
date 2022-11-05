import { AddFileToAppSubscriptionContractCommandHandler } from './add-file-to-app-subscription-contract';
import { CreateFileCommandHandler } from './create-file';
import { RemoveFileCommandHandler } from './remove-file';
import { RemoveFileFromAppSubscriptionContractCommandHandler } from './remove-file-from-app-subscription-contract';
import { StartFileEncodingCommandHandler } from './start-file-encoding';
import { UpdateFileCommandHandler } from './update-file';

export const FileCommandHandlers = [
  CreateFileCommandHandler,
  RemoveFileCommandHandler,
  UpdateFileCommandHandler,
  StartFileEncodingCommandHandler,
  AddFileToAppSubscriptionContractCommandHandler,
  RemoveFileFromAppSubscriptionContractCommandHandler
];
