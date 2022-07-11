import { FindAllCourseInstructorsQueryHandler } from './find-all-course-instructors';
import { FindCourseInstructorByIdQueryHandler } from './find-course-instructor-by-id';

export const CourseInstructorQueriesHandlers = [
  FindCourseInstructorByIdQueryHandler,
  FindAllCourseInstructorsQueryHandler
];
