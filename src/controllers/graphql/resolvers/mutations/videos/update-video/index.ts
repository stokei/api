import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateVideoInput } from '@/controllers/graphql/inputs/videos/update-video.input';
import { Video } from '@/controllers/graphql/types/video';
import { UpdateVideoService } from '@/services/videos/update-video';

@Resolver(() => Video)
export class UpdateVideoResolver {
  constructor(private readonly updateVideoService: UpdateVideoService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Video)
  async updateVideo(
    @Args('input') data: UpdateVideoInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateVideoService.execute(data);
    return response;
  }
}
