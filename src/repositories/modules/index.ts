import { CountModulesRepository } from './count-modules';
import { CreateModuleRepository } from './create-module';
import { ExistsModulesRepository } from './exists-modules';
import { FindAllModulesRepository } from './find-all-modules';
import { FindModuleByIdRepository } from './find-module-by-id';
import { RemoveModuleRepository } from './remove-module';
import { UpdateModuleRepository } from './update-module';

export const ModulesRepositories = [
  CountModulesRepository,
  CreateModuleRepository,
  ExistsModulesRepository,
  FindModuleByIdRepository,
  FindAllModulesRepository,
  RemoveModuleRepository,
  UpdateModuleRepository
];
