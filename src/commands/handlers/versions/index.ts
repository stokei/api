import { CreateVersionCommandHandler } from './create-version';
import { RemoveVersionCommandHandler } from './remove-version';
import { UpdateVersionCommandHandler } from './update-version';

export const VersionCommandHandlers = [
  CreateVersionCommandHandler,
  RemoveVersionCommandHandler,
  UpdateVersionCommandHandler
];
