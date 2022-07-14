import { CreateCourseInstructorService } from './create-course-instructor';
import { FindAllCourseInstructorsService } from './find-all-course-instructors';
import { FindCourseInstructorByIdService } from './find-course-instructor-by-id';
import { RemoveCourseInstructorService } from './remove-course-instructor';

export const CourseInstructorServices = [
  CreateCourseInstructorService,
  RemoveCourseInstructorService,
  FindCourseInstructorByIdService,
  FindAllCourseInstructorsService
];
