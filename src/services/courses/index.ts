import { FindCourseByIdService } from './find-course-by-id';
import { FindAllCoursesService } from './find-all-courses';
import { CreateCourseService } from './create-course';
import { RemoveCourseService } from './remove-course';
import { UpdateCourseService } from './update-course';

export const CourseServices = [
  CreateCourseService,
  RemoveCourseService,
  UpdateCourseService,
  FindCourseByIdService,
  FindAllCoursesService
];
