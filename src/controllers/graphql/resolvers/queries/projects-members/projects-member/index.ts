import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProjectsMembersLoader } from '@/controllers/graphql/dataloaders/projects-members.loader';
import { ProjectsMember } from '@/controllers/graphql/types/projects-member';
import {
  ProjectsMemberNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ProjectsMember)
export class ProjectsMemberResolver {
  constructor(private readonly projectsMembersLoader: ProjectsMembersLoader) {}

  @Query(() => ProjectsMember)
  async projectsMember(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const projectsMember = await this.projectsMembersLoader.findByIds.load(id);
    if (!projectsMember) {
      throw new ProjectsMemberNotFoundException();
    }
    return projectsMember;
  }
}
