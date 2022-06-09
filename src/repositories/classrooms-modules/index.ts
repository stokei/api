import { CountClassroomsModulesRepository } from './count-classrooms-modules';
import { CreateClassroomsModuleRepository } from './create-classrooms-module';
import { ExistsClassroomsModulesRepository } from './exists-classrooms-modules';
import { FindAllClassroomsModulesRepository } from './find-all-classrooms-modules';
import { FindClassroomsModuleByIdRepository } from './find-classrooms-module-by-id';
import { RemoveClassroomsModuleRepository } from './remove-classrooms-module';
import { UpdateClassroomsModuleRepository } from './update-classrooms-module';

export const ClassroomsModulesRepositories = [
  CountClassroomsModulesRepository,
  CreateClassroomsModuleRepository,
  ExistsClassroomsModulesRepository,
  FindClassroomsModuleByIdRepository,
  FindAllClassroomsModulesRepository,
  RemoveClassroomsModuleRepository,
  UpdateClassroomsModuleRepository
];
