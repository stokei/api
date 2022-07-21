import { CreateProjectService } from './create-project';
import { FindAllProjectsService } from './find-all-projects';
import { FindProjectByIdService } from './find-project-by-id';
import { UpdateProjectService } from './update-project';

export const ProjectServices = [
  CreateProjectService,
  UpdateProjectService,
  FindProjectByIdService,
  FindAllProjectsService
];
