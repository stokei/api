import { FindAllClassroomsQueryHandler } from './find-all-classrooms';
import { FindClassroomByIdQueryHandler } from './find-classroom-by-id';

export const ClassroomQueriesHandlers = [
  FindClassroomByIdQueryHandler,
  FindAllClassroomsQueryHandler
];
