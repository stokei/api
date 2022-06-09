import { FindAllClassroomsMaterialsQueryHandler } from './find-all-classrooms-materials';
import { FindClassroomsMaterialByIdQueryHandler } from './find-classrooms-material-by-id';

export const ClassroomsMaterialQueriesHandlers = [
  FindClassroomsMaterialByIdQueryHandler,
  FindAllClassroomsMaterialsQueryHandler
];
