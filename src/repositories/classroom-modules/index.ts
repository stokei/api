import { CountClassroomModulesRepository } from './count-classroom-modules';
import { CreateClassroomModuleRepository } from './create-classroom-module';
import { ExistsClassroomModulesRepository } from './exists-classroom-modules';
import { FindAllClassroomModulesRepository } from './find-all-classroom-modules';
import { FindClassroomModuleByIdRepository } from './find-classroom-module-by-id';
import { RemoveClassroomModuleRepository } from './remove-classroom-module';

export const ClassroomModulesRepositories = [
  CountClassroomModulesRepository,
  CreateClassroomModuleRepository,
  ExistsClassroomModulesRepository,
  FindClassroomModuleByIdRepository,
  FindAllClassroomModulesRepository,
  RemoveClassroomModuleRepository
];
