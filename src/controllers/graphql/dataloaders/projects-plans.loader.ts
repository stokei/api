import { Injectable, Scope } from '@nestjs/common';
import { FindAllProjectsPlansService } from '@/services/projects-plans/find-all-projects-plans';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ProjectsPlansLoader {
  constructor(
    private readonly projectsPlansService: FindAllProjectsPlansService
  ) {}

  readonly findByIds = new DataLoader(async (projectsPlanIds: string[]) => {
    const projectsPlans = await this.projectsPlansService.execute({
      where: {
        AND: {
          ids: projectsPlanIds
        }
      }
    });
    const projectsPlansMap = new Map(
      projectsPlans?.items?.map((projectsPlan) => [
        projectsPlan.id,
        projectsPlan
      ])
    );
    return projectsPlanIds.map((projectsPlanId) =>
      projectsPlansMap.get(projectsPlanId)
    );
  });
}
