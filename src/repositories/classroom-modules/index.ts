import { CountClassroomModulesRepository } from './count-classroom-module s';
import { CreateClassroomModuleRepository } from './create-classroom-module ';
import { ExistsClassroomModulesRepository } from './exists-classroom-module s';
import { FindAllClassroomModulesRepository } from './find-all-classroom-module s';
import { FindClassroomModuleByIdRepository } from './find-classroom-module -by-id';
import { RemoveClassroomModuleRepository } from './remove-classroom-module ';
import { UpdateClassroomModuleRepository } from './update-classroom-module ';

export const ClassroomModulesRepositories = [
  CountClassroomModulesRepository,
  CreateClassroomModuleRepository,
  ExistsClassroomModulesRepository,
  FindClassroomModuleByIdRepository,
  FindAllClassroomModulesRepository,
  RemoveClassroomModuleRepository,
  UpdateClassroomModuleRepository
];
