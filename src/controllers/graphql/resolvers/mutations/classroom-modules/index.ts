import { CreateClassroomModuleResolver } from './create-classroom-module ';
import { RemoveClassroomModuleResolver } from './remove-classroom-module ';
import { UpdateClassroomModuleResolver } from './update-classroom-module ';

export const ClassroomModulesMutations = [
  CreateClassroomModuleResolver,
  RemoveClassroomModuleResolver,
  UpdateClassroomModuleResolver
];
