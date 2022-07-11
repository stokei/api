import { FindAllClassroomStudentsQueryHandler } from './find-all-classroom-students';
import { FindClassroomStudentByIdQueryHandler } from './find-classroom-student-by-id';

export const ClassroomStudentQueriesHandlers = [
  FindClassroomStudentByIdQueryHandler,
  FindAllClassroomStudentsQueryHandler
];
