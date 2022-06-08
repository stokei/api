import { FindModuleByIdService } from './find-module-by-id';
import { FindAllModulesService } from './find-all-modules';
import { CreateModuleService } from './create-module';
import { RemoveModuleService } from './remove-module';
import { UpdateModuleService } from './update-module';

export const ModuleServices = [
  CreateModuleService,
  RemoveModuleService,
  UpdateModuleService,
  FindModuleByIdService,
  FindAllModulesService
];
