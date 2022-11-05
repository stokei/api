import { FindAllAppInstructorsQueryHandler } from './find-all-app-instructors';
import { FindAppInstructorByIdQueryHandler } from './find-app-instructor-by-id';

export const AppInstructorQueriesHandlers = [
  FindAppInstructorByIdQueryHandler,
  FindAllAppInstructorsQueryHandler
];
