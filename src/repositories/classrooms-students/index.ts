import { CountClassroomsStudentsRepository } from './count-classrooms-students';
import { CreateClassroomsStudentRepository } from './create-classrooms-student';
import { ExistsClassroomsStudentsRepository } from './exists-classrooms-students';
import { FindClassroomsStudentByIdRepository } from './find-classrooms-student-by-id';
import { FindAllClassroomsStudentsRepository } from './find-all-classrooms-students';
import { RemoveClassroomsStudentRepository } from './remove-classrooms-student';
import { UpdateClassroomsStudentRepository } from './update-classrooms-student';

export const ClassroomsStudentsRepositories = [
  CountClassroomsStudentsRepository,
  CreateClassroomsStudentRepository,
  ExistsClassroomsStudentsRepository,
  FindClassroomsStudentByIdRepository,
  FindAllClassroomsStudentsRepository,
  RemoveClassroomsStudentRepository,
  UpdateClassroomsStudentRepository
];
