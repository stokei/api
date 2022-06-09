import { FindAllProjectsMembersQueryHandler } from './find-all-projects-members';
import { FindProjectsMemberByIdQueryHandler } from './find-projects-member-by-id';

export const ProjectsMemberQueriesHandlers = [
  FindProjectsMemberByIdQueryHandler,
  FindAllProjectsMembersQueryHandler
];
