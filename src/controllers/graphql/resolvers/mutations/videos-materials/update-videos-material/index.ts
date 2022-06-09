import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateVideosMaterialInput } from '@/controllers/graphql/inputs/videos-materials/update-videos-material.input';
import { VideosMaterial } from '@/controllers/graphql/types/videos-material';
import { UpdateVideosMaterialService } from '@/services/videos-materials/update-videos-material';

@Resolver(() => VideosMaterial)
export class UpdateVideosMaterialResolver {
  constructor(
    private readonly updateVideosMaterialService: UpdateVideosMaterialService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosMaterial)
  async updateVideosMaterial(
    @Args('input') data: UpdateVideosMaterialInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateVideosMaterialService.execute(data);
    return response;
  }
}
