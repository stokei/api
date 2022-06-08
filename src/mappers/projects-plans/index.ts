import { convertToISODateString } from '@stokei/nestjs';
import { ProjectsPlanEntity } from '@/entities';
import { ProjectsPlanModel } from '@/models/projects-plan.model';

export class ProjectsPlanMapper {
  toModel(projectsPlan: ProjectsPlanEntity) {
    return (
      projectsPlan &&
      new ProjectsPlanModel({
        ...projectsPlan,
        updatedAt: convertToISODateString(projectsPlan.updatedAt),
        createdAt: convertToISODateString(projectsPlan.createdAt)
      })
    );
  }
  toModels(projectsPlans: ProjectsPlanEntity[]) {
    return projectsPlans?.length > 0
      ? projectsPlans.map(this.toModel).filter(Boolean)
      : [];
  }
}
