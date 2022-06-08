import { Injectable, Scope } from '@nestjs/common';
import { FindAllProjectsService } from '@/services/projects/find-all-projects';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ProjectsLoader {
  constructor(private readonly projectsService: FindAllProjectsService) {}

  readonly findByIds = new DataLoader(async (projectIds: string[]) => {
    const projects = await this.projectsService.execute({
      where: {
        AND: {
          ids: projectIds
        }
      }
    });
    const projectsMap = new Map(
      projects?.items?.map((project) => [project.id, project])
    );
    return projectIds.map((projectId) => projectsMap.get(projectId));
  });
}
