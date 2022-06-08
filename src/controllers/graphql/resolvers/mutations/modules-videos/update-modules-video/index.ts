import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateModulesVideoInput } from '@/controllers/graphql/inputs/modules-videos/update-modules-video.input';
import { ModulesVideo } from '@/controllers/graphql/types/modules-video';
import { UpdateModulesVideoService } from '@/services/modules-videos/update-modules-video';

@Resolver(() => ModulesVideo)
export class UpdateModulesVideoResolver {
  constructor(
    private readonly updateModulesVideoService: UpdateModulesVideoService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ModulesVideo)
  async updateModulesVideo(
    @Args('input') data: UpdateModulesVideoInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateModulesVideoService.execute(data);
    return response;
  }
}
