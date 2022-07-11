import { FindAllClassroomInstructorsQueryHandler } from './find-all-classroom-instructors';
import { FindClassroomInstructorByIdQueryHandler } from './find-classroom-instructor-by-id';

export const ClassroomInstructorQueriesHandlers = [
  FindClassroomInstructorByIdQueryHandler,
  FindAllClassroomInstructorsQueryHandler
];
