import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveVideosSubtitleInput } from '@/controllers/graphql/inputs/videos-subtitles/remove-videos-subtitle.input';
import { VideosSubtitle } from '@/controllers/graphql/types/videos-subtitle';
import { RemoveVideosSubtitleService } from '@/services/videos-subtitles/remove-videos-subtitle';

@Resolver(() => VideosSubtitle)
export class RemoveVideosSubtitleResolver {
  constructor(
    private readonly removeVideosSubtitleService: RemoveVideosSubtitleService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosSubtitle)
  async removeVideosSubtitle(
    @Args('input') data: RemoveVideosSubtitleInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeVideosSubtitleService.execute(data);
    return response;
  }
}
