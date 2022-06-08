import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveAccessInput } from '@/controllers/graphql/inputs/accesses/remove-access.input';
import { Access } from '@/controllers/graphql/types/access';
import { RemoveAccessService } from '@/services/accesses/remove-access';

@Resolver(() => Access)
export class RemoveAccessResolver {
  constructor(private readonly removeAccessService: RemoveAccessService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Access)
  async removeAccess(
    @Args('input') data: RemoveAccessInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeAccessService.execute(data);
    return response;
  }
}
