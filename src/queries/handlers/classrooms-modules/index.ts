import { FindAllClassroomsModulesQueryHandler } from './find-all-classrooms-modules';
import { FindClassroomsModuleByIdQueryHandler } from './find-classrooms-module-by-id';

export const ClassroomsModuleQueriesHandlers = [
  FindClassroomsModuleByIdQueryHandler,
  FindAllClassroomsModulesQueryHandler
];
