import { FindAllClassroomsInstructorsQueryHandler } from './find-all-classrooms-instructors';
import { FindClassroomsInstructorByIdQueryHandler } from './find-classrooms-instructor-by-id';

export const ClassroomsInstructorQueriesHandlers = [
  FindClassroomsInstructorByIdQueryHandler,
  FindAllClassroomsInstructorsQueryHandler
];
