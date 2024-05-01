import { CreateVersionCommandHandler } from './create-version';
import { PublishVersionCommandHandler } from './publish-version';
import { RemoveVersionCommandHandler } from './remove-version';
import { RemoveVersionComponentsCommandHandler } from './remove-version-components';
import { UpdateVersionCommandHandler } from './update-version';

export const VersionCommandHandlers = [
  CreateVersionCommandHandler,
  RemoveVersionCommandHandler,
  UpdateVersionCommandHandler,
  PublishVersionCommandHandler,
  RemoveVersionComponentsCommandHandler
];
