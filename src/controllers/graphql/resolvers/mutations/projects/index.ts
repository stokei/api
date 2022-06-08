import { CreateProjectResolver } from './create-project';
import { RemoveProjectResolver } from './remove-project';
import { UpdateProjectResolver } from './update-project';

export const ProjectsMutations = [
  CreateProjectResolver,
  RemoveProjectResolver,
  UpdateProjectResolver
];
