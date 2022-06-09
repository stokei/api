import { FindAllProjectsPlansQueryHandler } from './find-all-projects-plans';
import { FindProjectsPlanByIdQueryHandler } from './find-projects-plan-by-id';

export const ProjectsPlanQueriesHandlers = [
  FindProjectsPlanByIdQueryHandler,
  FindAllProjectsPlansQueryHandler
];
