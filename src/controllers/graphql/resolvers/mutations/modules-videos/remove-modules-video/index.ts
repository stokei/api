import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveModulesVideoInput } from '@/controllers/graphql/inputs/modules-videos/remove-modules-video.input';
import { ModulesVideo } from '@/controllers/graphql/types/modules-video';
import { RemoveModulesVideoService } from '@/services/modules-videos/remove-modules-video';

@Resolver(() => ModulesVideo)
export class RemoveModulesVideoResolver {
  constructor(
    private readonly removeModulesVideoService: RemoveModulesVideoService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ModulesVideo)
  async removeModulesVideo(
    @Args('input') data: RemoveModulesVideoInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeModulesVideoService.execute(data);
    return response;
  }
}
