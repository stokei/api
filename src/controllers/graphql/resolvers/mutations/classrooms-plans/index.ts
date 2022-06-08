import { CreateClassroomsPlanResolver } from './create-classrooms-plan';
import { RemoveClassroomsPlanResolver } from './remove-classrooms-plan';
import { UpdateClassroomsPlanResolver } from './update-classrooms-plan';

export const ClassroomsPlansMutations = [
  CreateClassroomsPlanResolver,
  RemoveClassroomsPlanResolver,
  UpdateClassroomsPlanResolver
];
