import { CreateVersionResolver } from './create-version';
import { PublishVersionResolver } from './publish-version';

export const VersionsMutations = [
  CreateVersionResolver,
  PublishVersionResolver
];
