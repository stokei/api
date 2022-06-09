import { CountCoursesRepository } from './count-courses';
import { CreateCourseRepository } from './create-course';
import { ExistsCoursesRepository } from './exists-courses';
import { FindAllCoursesRepository } from './find-all-courses';
import { FindCourseByIdRepository } from './find-course-by-id';
import { RemoveCourseRepository } from './remove-course';
import { UpdateCourseRepository } from './update-course';

export const CoursesRepositories = [
  CountCoursesRepository,
  CreateCourseRepository,
  ExistsCoursesRepository,
  FindCourseByIdRepository,
  FindAllCoursesRepository,
  RemoveCourseRepository,
  UpdateCourseRepository
];
