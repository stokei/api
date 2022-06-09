import { FindAllClassroomsTagsQueryHandler } from './find-all-classrooms-tags';
import { FindClassroomsTagByIdQueryHandler } from './find-classrooms-tag-by-id';

export const ClassroomsTagQueriesHandlers = [
  FindClassroomsTagByIdQueryHandler,
  FindAllClassroomsTagsQueryHandler
];
