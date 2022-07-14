import { CountClassroomStudentsRepository } from './count-classroom-students';
import { CreateClassroomStudentRepository } from './create-classroom-student';
import { ExistsClassroomStudentsRepository } from './exists-classroom-students';
import { FindAllClassroomStudentsRepository } from './find-all-classroom-students';
import { FindClassroomStudentByIdRepository } from './find-classroom-student-by-id';
import { RemoveClassroomStudentRepository } from './remove-classroom-student';

export const ClassroomStudentsRepositories = [
  CountClassroomStudentsRepository,
  CreateClassroomStudentRepository,
  ExistsClassroomStudentsRepository,
  FindClassroomStudentByIdRepository,
  FindAllClassroomStudentsRepository,
  RemoveClassroomStudentRepository
];
