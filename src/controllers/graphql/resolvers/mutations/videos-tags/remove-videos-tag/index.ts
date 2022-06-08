import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveVideosTagInput } from '@/controllers/graphql/inputs/videos-tags/remove-videos-tag.input';
import { VideosTag } from '@/controllers/graphql/types/videos-tag';
import { RemoveVideosTagService } from '@/services/videos-tags/remove-videos-tag';

@Resolver(() => VideosTag)
export class RemoveVideosTagResolver {
  constructor(
    private readonly removeVideosTagService: RemoveVideosTagService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosTag)
  async removeVideosTag(
    @Args('input') data: RemoveVideosTagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeVideosTagService.execute(data);
    return response;
  }
}
