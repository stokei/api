import { CreateModuleService } from './create-module';
import { FindAllModulesService } from './find-all-modules';
import { FindModuleByIdService } from './find-module-by-id';
import { RemoveModuleService } from './remove-module';
import { UpdateModuleService } from './update-module';

export const ModuleServices = [
  CreateModuleService,
  RemoveModuleService,
  UpdateModuleService,
  FindModuleByIdService,
  FindAllModulesService
];
