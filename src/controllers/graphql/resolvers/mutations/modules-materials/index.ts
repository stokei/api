import { CreateModulesMaterialResolver } from './create-modules-material';
import { RemoveModulesMaterialResolver } from './remove-modules-material';
import { UpdateModulesMaterialResolver } from './update-modules-material';

export const ModulesMaterialsMutations = [
  CreateModulesMaterialResolver,
  RemoveModulesMaterialResolver,
  UpdateModulesMaterialResolver
];
