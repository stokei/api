import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateVideosMaterialInput } from '@/controllers/graphql/inputs/videos-materials/create-videos-material.input';
import { VideosMaterial } from '@/controllers/graphql/types/videos-material';
import { CreateVideosMaterialService } from '@/services/videos-materials/create-videos-material';

@Resolver(() => VideosMaterial)
export class CreateVideosMaterialResolver {
  constructor(
    private readonly createVideosMaterialService: CreateVideosMaterialService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosMaterial)
  async createVideosMaterial(
    @Args('input') data: CreateVideosMaterialInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createVideosMaterialService.execute(data);
    return response;
  }
}
