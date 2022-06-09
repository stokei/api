import { FindAllCoursesAdminsQueryHandler } from './find-all-courses-admins';
import { FindCoursesAdminByIdQueryHandler } from './find-courses-admin-by-id';

export const CoursesAdminQueriesHandlers = [
  FindCoursesAdminByIdQueryHandler,
  FindAllCoursesAdminsQueryHandler
];
