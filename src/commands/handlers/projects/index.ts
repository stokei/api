import { CreateProjectCommandHandler } from './create-project';
import { RemoveProjectCommandHandler } from './remove-project';
import { UpdateProjectCommandHandler } from './update-project';

export const ProjectCommandHandlers = [
  CreateProjectCommandHandler,
  RemoveProjectCommandHandler,
  UpdateProjectCommandHandler
];
