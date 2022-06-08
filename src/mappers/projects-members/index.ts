import { convertToISODateString } from '@stokei/nestjs';
import { ProjectsMemberEntity } from '@/entities';
import { ProjectsMemberModel } from '@/models/projects-member.model';

export class ProjectsMemberMapper {
  toModel(projectsMember: ProjectsMemberEntity) {
    return (
      projectsMember &&
      new ProjectsMemberModel({
        ...projectsMember,
        updatedAt: convertToISODateString(projectsMember.updatedAt),
        createdAt: convertToISODateString(projectsMember.createdAt)
      })
    );
  }
  toModels(projectsMembers: ProjectsMemberEntity[]) {
    return projectsMembers?.length > 0
      ? projectsMembers.map(this.toModel).filter(Boolean)
      : [];
  }
}
