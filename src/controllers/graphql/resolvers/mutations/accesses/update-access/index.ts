import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateAccessInput } from '@/controllers/graphql/inputs/accesses/update-access.input';
import { Access } from '@/controllers/graphql/types/access';
import { UpdateAccessService } from '@/services/accesses/update-access';

@Resolver(() => Access)
export class UpdateAccessResolver {
  constructor(private readonly updateAccessService: UpdateAccessService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Access)
  async updateAccess(
    @Args('input') data: UpdateAccessInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateAccessService.execute(data);
    return response;
  }
}
