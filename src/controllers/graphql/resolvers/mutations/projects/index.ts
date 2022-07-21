import { CreateProjectResolver } from './create-project';
import { UpdateProjectResolver } from './update-project';

export const ProjectsMutations = [CreateProjectResolver, UpdateProjectResolver];
