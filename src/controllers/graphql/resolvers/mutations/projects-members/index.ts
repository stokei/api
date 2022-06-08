import { CreateProjectsMemberResolver } from './create-projects-member';
import { RemoveProjectsMemberResolver } from './remove-projects-member';
import { UpdateProjectsMemberResolver } from './update-projects-member';

export const ProjectsMembersMutations = [
  CreateProjectsMemberResolver,
  RemoveProjectsMemberResolver,
  UpdateProjectsMemberResolver
];
