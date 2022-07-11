import { CreateClassroomStudentResolver } from './create-classroom-student';
import { RemoveClassroomStudentResolver } from './remove-classroom-student';
import { UpdateClassroomStudentResolver } from './update-classroom-student';

export const ClassroomStudentsMutations = [
  CreateClassroomStudentResolver,
  RemoveClassroomStudentResolver,
  UpdateClassroomStudentResolver
];
