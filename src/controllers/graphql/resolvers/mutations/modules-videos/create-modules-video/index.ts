import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateModulesVideoInput } from '@/controllers/graphql/inputs/modules-videos/create-modules-video.input';
import { ModulesVideo } from '@/controllers/graphql/types/modules-video';
import { CreateModulesVideoService } from '@/services/modules-videos/create-modules-video';

@Resolver(() => ModulesVideo)
export class CreateModulesVideoResolver {
  constructor(
    private readonly createModulesVideoService: CreateModulesVideoService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ModulesVideo)
  async createModulesVideo(
    @Args('input') data: CreateModulesVideoInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createModulesVideoService.execute(data);
    return response;
  }
}
