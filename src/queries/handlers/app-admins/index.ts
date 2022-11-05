import { FindAllAppAdminsQueryHandler } from './find-all-app-admins';
import { FindAppAdminByIdQueryHandler } from './find-app-admin-by-id';

export const AppAdminQueriesHandlers = [
  FindAppAdminByIdQueryHandler,
  FindAllAppAdminsQueryHandler
];
