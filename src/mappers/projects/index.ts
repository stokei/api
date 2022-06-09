import { convertToISODateString } from '@stokei/nestjs';

import { ProjectEntity } from '@/entities';
import { ProjectModel } from '@/models/project.model';

export class ProjectMapper {
  toModel(project: ProjectEntity) {
    return (
      project &&
      new ProjectModel({
        ...project,
        updatedAt: convertToISODateString(project.updatedAt),
        createdAt: convertToISODateString(project.createdAt)
      })
    );
  }
  toModels(projects: ProjectEntity[]) {
    return projects?.length > 0
      ? projects.map(this.toModel).filter(Boolean)
      : [];
  }
}
