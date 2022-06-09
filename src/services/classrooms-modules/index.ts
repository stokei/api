import { CreateClassroomsModuleService } from './create-classrooms-module';
import { FindAllClassroomsModulesService } from './find-all-classrooms-modules';
import { FindClassroomsModuleByIdService } from './find-classrooms-module-by-id';
import { RemoveClassroomsModuleService } from './remove-classrooms-module';
import { UpdateClassroomsModuleService } from './update-classrooms-module';

export const ClassroomsModuleServices = [
  CreateClassroomsModuleService,
  RemoveClassroomsModuleService,
  UpdateClassroomsModuleService,
  FindClassroomsModuleByIdService,
  FindAllClassroomsModulesService
];
