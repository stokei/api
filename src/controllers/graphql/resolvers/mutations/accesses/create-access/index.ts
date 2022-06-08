import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateAccessInput } from '@/controllers/graphql/inputs/accesses/create-access.input';
import { Access } from '@/controllers/graphql/types/access';
import { CreateAccessService } from '@/services/accesses/create-access';

@Resolver(() => Access)
export class CreateAccessResolver {
  constructor(private readonly createAccessService: CreateAccessService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Access)
  async createAccess(
    @Args('input') data: CreateAccessInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createAccessService.execute(data);
    return response;
  }
}
