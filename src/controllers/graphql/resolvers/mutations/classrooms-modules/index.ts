import { CreateClassroomsModuleResolver } from './create-classrooms-module';
import { RemoveClassroomsModuleResolver } from './remove-classrooms-module';
import { UpdateClassroomsModuleResolver } from './update-classrooms-module';

export const ClassroomsModulesMutations = [
  CreateClassroomsModuleResolver,
  RemoveClassroomsModuleResolver,
  UpdateClassroomsModuleResolver
];
