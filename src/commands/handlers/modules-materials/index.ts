import { CreateModulesMaterialCommandHandler } from './create-modules-material';
import { RemoveModulesMaterialCommandHandler } from './remove-modules-material';
import { UpdateModulesMaterialCommandHandler } from './update-modules-material';

export const ModulesMaterialCommandHandlers = [
  CreateModulesMaterialCommandHandler,
  RemoveModulesMaterialCommandHandler,
  UpdateModulesMaterialCommandHandler
];
