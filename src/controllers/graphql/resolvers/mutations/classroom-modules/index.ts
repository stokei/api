import { CreateClassroomModuleResolver } from './create-classroom-module';
import { RemoveClassroomModuleResolver } from './remove-classroom-module';

export const ClassroomModulesMutations = [
  CreateClassroomModuleResolver,
  RemoveClassroomModuleResolver
];
