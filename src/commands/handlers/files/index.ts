import { CreateFileCommandHandler } from './create-file';
import { RemoveFileCommandHandler } from './remove-file';
import { StartFileEncodingCommandHandler } from './start-file-encoding';
import { UpdateFileCommandHandler } from './update-file';

export const FileCommandHandlers = [
  CreateFileCommandHandler,
  RemoveFileCommandHandler,
  UpdateFileCommandHandler,
  StartFileEncodingCommandHandler
];
