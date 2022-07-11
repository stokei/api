import { CreateModuleVideoResolver } from './create-module-video';
import { RemoveModuleVideoResolver } from './remove-module-video';
import { UpdateModuleVideoResolver } from './update-module-video';

export const ModuleVideosMutations = [
  CreateModuleVideoResolver,
  RemoveModuleVideoResolver,
  UpdateModuleVideoResolver
];
