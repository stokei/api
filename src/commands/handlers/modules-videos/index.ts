import { CreateModulesVideoCommandHandler } from './create-modules-video';
import { RemoveModulesVideoCommandHandler } from './remove-modules-video';
import { UpdateModulesVideoCommandHandler } from './update-modules-video';

export const ModulesVideoCommandHandlers = [
  CreateModulesVideoCommandHandler,
  RemoveModulesVideoCommandHandler,
  UpdateModulesVideoCommandHandler
];
