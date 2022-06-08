import { CreateVersionResolver } from './create-version';
import { RemoveVersionResolver } from './remove-version';
import { UpdateVersionResolver } from './update-version';

export const VersionsMutations = [
  CreateVersionResolver,
  RemoveVersionResolver,
  UpdateVersionResolver
];
