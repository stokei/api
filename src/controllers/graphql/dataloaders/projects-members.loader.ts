import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllProjectsMembersService } from '@/services/projects-members/find-all-projects-members';

@Injectable({ scope: Scope.REQUEST })
export class ProjectsMembersLoader {
  constructor(
    private readonly projectsMembersService: FindAllProjectsMembersService
  ) {}

  readonly findByIds = new DataLoader(async (projectsMemberIds: string[]) => {
    const projectsMembers = await this.projectsMembersService.execute({
      where: {
        AND: {
          ids: projectsMemberIds
        }
      }
    });
    const projectsMembersMap = new Map(
      projectsMembers?.items?.map((projectsMember) => [
        projectsMember.id,
        projectsMember
      ])
    );
    return projectsMemberIds.map((projectsMemberId) =>
      projectsMembersMap.get(projectsMemberId)
    );
  });
}
