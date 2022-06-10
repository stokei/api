import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateProjectsMemberInput } from '@/controllers/graphql/inputs/projects-members/create-projects-member.input';
import { ProjectsMember } from '@/controllers/graphql/types/projects-member';
import { CreateProjectsMemberService } from '@/services/projects-members/create-projects-member';

@Resolver(() => ProjectsMember)
export class CreateProjectsMemberResolver {
  constructor(
    private readonly createProjectsMemberService: CreateProjectsMemberService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ProjectsMember)
  async createProjectsMember(@Args('input') data: CreateProjectsMemberInput) {
    const response = await this.createProjectsMemberService.execute(data);
    return response;
  }
}
