import { CreateClassroomModuleService } from './create-classroom-module';
import { FindAllClassroomModulesService } from './find-all-classroom-modules';
import { FindClassroomModuleByIdService } from './find-classroom-module-by-id';
import { RemoveClassroomModuleService } from './remove-classroom-module';

export const ClassroomModuleServices = [
  CreateClassroomModuleService,
  RemoveClassroomModuleService,
  FindClassroomModuleByIdService,
  FindAllClassroomModulesService
];
