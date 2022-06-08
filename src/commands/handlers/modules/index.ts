import { CreateModuleCommandHandler } from './create-module';
import { RemoveModuleCommandHandler } from './remove-module';
import { UpdateModuleCommandHandler } from './update-module';

export const ModuleCommandHandlers = [
  CreateModuleCommandHandler,
  RemoveModuleCommandHandler,
  UpdateModuleCommandHandler
];
