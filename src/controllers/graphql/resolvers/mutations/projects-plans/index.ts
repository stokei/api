import { CreateProjectsPlanResolver } from './create-projects-plan';
import { RemoveProjectsPlanResolver } from './remove-projects-plan';
import { UpdateProjectsPlanResolver } from './update-projects-plan';

export const ProjectsPlansMutations = [
  CreateProjectsPlanResolver,
  RemoveProjectsPlanResolver,
  UpdateProjectsPlanResolver
];
