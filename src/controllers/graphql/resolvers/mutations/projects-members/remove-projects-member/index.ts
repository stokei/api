import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveProjectsMemberInput } from '@/controllers/graphql/inputs/projects-members/remove-projects-member.input';
import { ProjectsMember } from '@/controllers/graphql/types/projects-member';
import { RemoveProjectsMemberService } from '@/services/projects-members/remove-projects-member';

@Resolver(() => ProjectsMember)
export class RemoveProjectsMemberResolver {
  constructor(
    private readonly removeProjectsMemberService: RemoveProjectsMemberService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ProjectsMember)
  async removeProjectsMember(@Args('input') data: RemoveProjectsMemberInput) {
    const response = await this.removeProjectsMemberService.execute(data);
    return response;
  }
}
