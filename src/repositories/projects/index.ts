import { CountProjectsRepository } from './count-projects';
import { CreateProjectRepository } from './create-project';
import { ExistsProjectsRepository } from './exists-projects';
import { FindProjectByIdRepository } from './find-project-by-id';
import { FindAllProjectsRepository } from './find-all-projects';
import { RemoveProjectRepository } from './remove-project';
import { UpdateProjectRepository } from './update-project';

export const ProjectsRepositories = [
  CountProjectsRepository,
  CreateProjectRepository,
  ExistsProjectsRepository,
  FindProjectByIdRepository,
  FindAllProjectsRepository,
  RemoveProjectRepository,
  UpdateProjectRepository
];
