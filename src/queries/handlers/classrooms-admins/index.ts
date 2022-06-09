import { FindAllClassroomsAdminsQueryHandler } from './find-all-classrooms-admins';
import { FindClassroomsAdminByIdQueryHandler } from './find-classrooms-admin-by-id';

export const ClassroomsAdminQueriesHandlers = [
  FindClassroomsAdminByIdQueryHandler,
  FindAllClassroomsAdminsQueryHandler
];
