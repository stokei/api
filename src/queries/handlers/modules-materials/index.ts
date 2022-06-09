import { FindAllModulesMaterialsQueryHandler } from './find-all-modules-materials';
import { FindModulesMaterialByIdQueryHandler } from './find-modules-material-by-id';

export const ModulesMaterialQueriesHandlers = [
  FindModulesMaterialByIdQueryHandler,
  FindAllModulesMaterialsQueryHandler
];
