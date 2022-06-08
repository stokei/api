import { CreateProjectsMemberCommandHandler } from './create-projects-member';
import { RemoveProjectsMemberCommandHandler } from './remove-projects-member';
import { UpdateProjectsMemberCommandHandler } from './update-projects-member';

export const ProjectsMemberCommandHandlers = [
  CreateProjectsMemberCommandHandler,
  RemoveProjectsMemberCommandHandler,
  UpdateProjectsMemberCommandHandler
];
