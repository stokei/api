import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateVideosSubtitleInput } from '@/controllers/graphql/inputs/videos-subtitles/create-videos-subtitle.input';
import { VideosSubtitle } from '@/controllers/graphql/types/videos-subtitle';
import { CreateVideosSubtitleService } from '@/services/videos-subtitles/create-videos-subtitle';

@Resolver(() => VideosSubtitle)
export class CreateVideosSubtitleResolver {
  constructor(
    private readonly createVideosSubtitleService: CreateVideosSubtitleService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosSubtitle)
  async createVideosSubtitle(
    @Args('input') data: CreateVideosSubtitleInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createVideosSubtitleService.execute(data);
    return response;
  }
}
