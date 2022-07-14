import { CreateClassroomStudentResolver } from './create-classroom-student';
import { RemoveClassroomStudentResolver } from './remove-classroom-student';

export const ClassroomStudentsMutations = [
  CreateClassroomStudentResolver,
  RemoveClassroomStudentResolver
];
