import { FindAllCoursesInstructorsQueryHandler } from './find-all-courses-instructors';
import { FindCoursesInstructorByIdQueryHandler } from './find-courses-instructor-by-id';

export const CoursesInstructorQueriesHandlers = [
  FindCoursesInstructorByIdQueryHandler,
  FindAllCoursesInstructorsQueryHandler
];
