import { FindProjectByIdService } from './find-project-by-id';
import { FindAllProjectsService } from './find-all-projects';
import { CreateProjectService } from './create-project';
import { RemoveProjectService } from './remove-project';
import { UpdateProjectService } from './update-project';

export const ProjectServices = [
  CreateProjectService,
  RemoveProjectService,
  UpdateProjectService,
  FindProjectByIdService,
  FindAllProjectsService
];
