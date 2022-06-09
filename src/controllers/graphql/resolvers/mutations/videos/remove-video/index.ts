import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveVideoInput } from '@/controllers/graphql/inputs/videos/remove-video.input';
import { Video } from '@/controllers/graphql/types/video';
import { RemoveVideoService } from '@/services/videos/remove-video';

@Resolver(() => Video)
export class RemoveVideoResolver {
  constructor(private readonly removeVideoService: RemoveVideoService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Video)
  async removeVideo(
    @Args('input') data: RemoveVideoInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeVideoService.execute(data);
    return response;
  }
}
