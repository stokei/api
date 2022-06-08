import { CreateClassroomsStudentResolver } from './create-classrooms-student';
import { RemoveClassroomsStudentResolver } from './remove-classrooms-student';
import { UpdateClassroomsStudentResolver } from './update-classrooms-student';

export const ClassroomsStudentsMutations = [
  CreateClassroomsStudentResolver,
  RemoveClassroomsStudentResolver,
  UpdateClassroomsStudentResolver
];
