import { CreateModuleVideoCommandHandler } from './create-module-video';
import { RemoveModuleVideoCommandHandler } from './remove-module-video';
import { UpdateModuleVideoCommandHandler } from './update-module-video';

export const ModuleVideoCommandHandlers = [
  CreateModuleVideoCommandHandler,
  RemoveModuleVideoCommandHandler,
  UpdateModuleVideoCommandHandler
];
