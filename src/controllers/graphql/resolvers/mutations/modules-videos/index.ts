import { CreateModulesVideoResolver } from './create-modules-video';
import { RemoveModulesVideoResolver } from './remove-modules-video';
import { UpdateModulesVideoResolver } from './update-modules-video';

export const ModulesVideosMutations = [
  CreateModulesVideoResolver,
  RemoveModulesVideoResolver,
  UpdateModulesVideoResolver
];
