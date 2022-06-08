import { CreateModuleResolver } from './create-module';
import { RemoveModuleResolver } from './remove-module';
import { UpdateModuleResolver } from './update-module';

export const ModulesMutations = [
  CreateModuleResolver,
  RemoveModuleResolver,
  UpdateModuleResolver
];
