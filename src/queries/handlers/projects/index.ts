import { FindAllProjectsQueryHandler } from './find-all-projects';
import { FindProjectByIdQueryHandler } from './find-project-by-id';

export const ProjectQueriesHandlers = [
  FindProjectByIdQueryHandler,
  FindAllProjectsQueryHandler
];
