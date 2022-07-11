import { CreateClassroomModuleService } from './create-classroom-module ';
import { FindAllClassroomModulesService } from './find-all-classroom-module s';
import { FindClassroomModuleByIdService } from './find-classroom-module -by-id';
import { RemoveClassroomModuleService } from './remove-classroom-module ';
import { UpdateClassroomModuleService } from './update-classroom-module ';

export const ClassroomModuleServices = [
  CreateClassroomModuleService,
  RemoveClassroomModuleService,
  UpdateClassroomModuleService,
  FindClassroomModuleByIdService,
  FindAllClassroomModulesService
];
