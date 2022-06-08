import { CountCoursesStudentsRepository } from './count-courses-students';
import { CreateCoursesStudentRepository } from './create-courses-student';
import { ExistsCoursesStudentsRepository } from './exists-courses-students';
import { FindCoursesStudentByIdRepository } from './find-courses-student-by-id';
import { FindAllCoursesStudentsRepository } from './find-all-courses-students';
import { RemoveCoursesStudentRepository } from './remove-courses-student';
import { UpdateCoursesStudentRepository } from './update-courses-student';

export const CoursesStudentsRepositories = [
  CountCoursesStudentsRepository,
  CreateCoursesStudentRepository,
  ExistsCoursesStudentsRepository,
  FindCoursesStudentByIdRepository,
  FindAllCoursesStudentsRepository,
  RemoveCoursesStudentRepository,
  UpdateCoursesStudentRepository
];
