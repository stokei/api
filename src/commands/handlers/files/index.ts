import { CreateFileCommandHandler } from './create-file';
import { RemoveFileCommandHandler } from './remove-file';
import { UpdateFileCommandHandler } from './update-file';

export const FileCommandHandlers = [
  CreateFileCommandHandler,
  RemoveFileCommandHandler,
  UpdateFileCommandHandler
];
