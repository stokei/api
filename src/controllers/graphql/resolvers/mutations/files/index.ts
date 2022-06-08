import { CreateFileResolver } from './create-file';
import { RemoveFileResolver } from './remove-file';
import { UpdateFileResolver } from './update-file';

export const FilesMutations = [
  CreateFileResolver,
  RemoveFileResolver,
  UpdateFileResolver
];
