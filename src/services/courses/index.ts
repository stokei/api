import { CreateCourseService } from './create-course';
import { FindAllCoursesService } from './find-all-courses';
import { FindCourseByIdService } from './find-course-by-id';
import { RemoveCourseService } from './remove-course';
import { UpdateCourseService } from './update-course';

export const CourseServices = [
  CreateCourseService,
  RemoveCourseService,
  UpdateCourseService,
  FindCourseByIdService,
  FindAllCoursesService
];
