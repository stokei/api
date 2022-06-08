import { CreateProjectsPlanCommandHandler } from './create-projects-plan';
import { RemoveProjectsPlanCommandHandler } from './remove-projects-plan';
import { UpdateProjectsPlanCommandHandler } from './update-projects-plan';

export const ProjectsPlanCommandHandlers = [
  CreateProjectsPlanCommandHandler,
  RemoveProjectsPlanCommandHandler,
  UpdateProjectsPlanCommandHandler
];
