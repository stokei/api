import { CountModulesMaterialsRepository } from './count-modules-materials';
import { CreateModulesMaterialRepository } from './create-modules-material';
import { ExistsModulesMaterialsRepository } from './exists-modules-materials';
import { FindModulesMaterialByIdRepository } from './find-modules-material-by-id';
import { FindAllModulesMaterialsRepository } from './find-all-modules-materials';
import { RemoveModulesMaterialRepository } from './remove-modules-material';
import { UpdateModulesMaterialRepository } from './update-modules-material';

export const ModulesMaterialsRepositories = [
  CountModulesMaterialsRepository,
  CreateModulesMaterialRepository,
  ExistsModulesMaterialsRepository,
  FindModulesMaterialByIdRepository,
  FindAllModulesMaterialsRepository,
  RemoveModulesMaterialRepository,
  UpdateModulesMaterialRepository
];
