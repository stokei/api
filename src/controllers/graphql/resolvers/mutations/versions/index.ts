import { CreateVersionResolver } from './create-version';
import { PublishVersionResolver } from './publish-version';
import { UpdateVersionResolver } from './update-version';

export const VersionsMutations = [
  CreateVersionResolver,
  PublishVersionResolver,
  UpdateVersionResolver
];
