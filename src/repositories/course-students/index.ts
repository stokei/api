import { CountCourseStudentsRepository } from './count-course-students';
import { CreateCourseStudentRepository } from './create-course-student';
import { ExistsCourseStudentsRepository } from './exists-course-students';
import { FindAllCourseStudentsRepository } from './find-all-course-students';
import { FindCourseStudentByCourseAndStudentRepository } from './find-course-student-by-course-and-student';
import { FindCourseStudentByIdRepository } from './find-course-student-by-id';
import { RemoveCourseStudentRepository } from './remove-course-student';

export const CourseStudentsRepositories = [
  CountCourseStudentsRepository,
  CreateCourseStudentRepository,
  ExistsCourseStudentsRepository,
  FindCourseStudentByIdRepository,
  FindAllCourseStudentsRepository,
  RemoveCourseStudentRepository,
  FindCourseStudentByCourseAndStudentRepository
];
