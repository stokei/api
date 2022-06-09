import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveVideosMaterialInput } from '@/controllers/graphql/inputs/videos-materials/remove-videos-material.input';
import { VideosMaterial } from '@/controllers/graphql/types/videos-material';
import { RemoveVideosMaterialService } from '@/services/videos-materials/remove-videos-material';

@Resolver(() => VideosMaterial)
export class RemoveVideosMaterialResolver {
  constructor(
    private readonly removeVideosMaterialService: RemoveVideosMaterialService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosMaterial)
  async removeVideosMaterial(
    @Args('input') data: RemoveVideosMaterialInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeVideosMaterialService.execute(data);
    return response;
  }
}
