import { CountProjectsPlansRepository } from './count-projects-plans';
import { CreateProjectsPlanRepository } from './create-projects-plan';
import { ExistsProjectsPlansRepository } from './exists-projects-plans';
import { FindAllProjectsPlansRepository } from './find-all-projects-plans';
import { FindProjectsPlanByIdRepository } from './find-projects-plan-by-id';
import { RemoveProjectsPlanRepository } from './remove-projects-plan';
import { UpdateProjectsPlanRepository } from './update-projects-plan';

export const ProjectsPlansRepositories = [
  CountProjectsPlansRepository,
  CreateProjectsPlanRepository,
  ExistsProjectsPlansRepository,
  FindProjectsPlanByIdRepository,
  FindAllProjectsPlansRepository,
  RemoveProjectsPlanRepository,
  UpdateProjectsPlanRepository
];
