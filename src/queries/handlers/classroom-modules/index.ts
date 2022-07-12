import { FindAllClassroomModulesQueryHandler } from './find-all-classroom-modules';
import { FindClassroomModuleByIdQueryHandler } from './find-classroom-module-by-id';

export const ClassroomModuleQueriesHandlers = [
  FindClassroomModuleByIdQueryHandler,
  FindAllClassroomModulesQueryHandler
];
