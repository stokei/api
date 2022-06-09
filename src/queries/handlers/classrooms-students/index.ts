import { FindAllClassroomsStudentsQueryHandler } from './find-all-classrooms-students';
import { FindClassroomsStudentByIdQueryHandler } from './find-classrooms-student-by-id';

export const ClassroomsStudentQueriesHandlers = [
  FindClassroomsStudentByIdQueryHandler,
  FindAllClassroomsStudentsQueryHandler
];
