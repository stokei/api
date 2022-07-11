import { CountCourseInstructorsRepository } from './count-course-instructors';
import { CreateCourseInstructorRepository } from './create-course-instructor';
import { ExistsCourseInstructorsRepository } from './exists-course-instructors';
import { FindAllCourseInstructorsRepository } from './find-all-course-instructors';
import { FindCourseInstructorByIdRepository } from './find-course-instructor-by-id';
import { RemoveCourseInstructorRepository } from './remove-course-instructor';
import { UpdateCourseInstructorRepository } from './update-course-instructor';

export const CourseInstructorsRepositories = [
  CountCourseInstructorsRepository,
  CreateCourseInstructorRepository,
  ExistsCourseInstructorsRepository,
  FindCourseInstructorByIdRepository,
  FindAllCourseInstructorsRepository,
  RemoveCourseInstructorRepository,
  UpdateCourseInstructorRepository
];
