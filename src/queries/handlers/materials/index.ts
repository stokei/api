import { FindAllMaterialsQueryHandler } from './find-all-materials';
import { FindMaterialByIdQueryHandler } from './find-material-by-id';

export const MaterialQueriesHandlers = [
  FindMaterialByIdQueryHandler,
  FindAllMaterialsQueryHandler
];
