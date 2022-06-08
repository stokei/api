import { FindModulesMaterialByIdService } from './find-modules-material-by-id';
import { FindAllModulesMaterialsService } from './find-all-modules-materials';
import { CreateModulesMaterialService } from './create-modules-material';
import { RemoveModulesMaterialService } from './remove-modules-material';
import { UpdateModulesMaterialService } from './update-modules-material';

export const ModulesMaterialServices = [
  CreateModulesMaterialService,
  RemoveModulesMaterialService,
  UpdateModulesMaterialService,
  FindModulesMaterialByIdService,
  FindAllModulesMaterialsService
];
