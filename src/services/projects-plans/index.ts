import { CreateProjectsPlanService } from './create-projects-plan';
import { FindAllProjectsPlansService } from './find-all-projects-plans';
import { FindProjectsPlanByIdService } from './find-projects-plan-by-id';
import { RemoveProjectsPlanService } from './remove-projects-plan';
import { UpdateProjectsPlanService } from './update-projects-plan';

export const ProjectsPlanServices = [
  CreateProjectsPlanService,
  RemoveProjectsPlanService,
  UpdateProjectsPlanService,
  FindProjectsPlanByIdService,
  FindAllProjectsPlansService
];
