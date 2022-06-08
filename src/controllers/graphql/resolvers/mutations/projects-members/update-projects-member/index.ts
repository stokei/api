import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateProjectsMemberInput } from '@/controllers/graphql/inputs/projects-members/update-projects-member.input';
import { ProjectsMember } from '@/controllers/graphql/types/projects-member';
import { UpdateProjectsMemberService } from '@/services/projects-members/update-projects-member';

@Resolver(() => ProjectsMember)
export class UpdateProjectsMemberResolver {
  constructor(
    private readonly updateProjectsMemberService: UpdateProjectsMemberService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProjectsMember)
  async updateProjectsMember(
    @Args('input') data: UpdateProjectsMemberInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateProjectsMemberService.execute(data);
    return response;
  }
}
