import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateVideosSubtitleInput } from '@/controllers/graphql/inputs/videos-subtitles/update-videos-subtitle.input';
import { VideosSubtitle } from '@/controllers/graphql/types/videos-subtitle';
import { UpdateVideosSubtitleService } from '@/services/videos-subtitles/update-videos-subtitle';

@Resolver(() => VideosSubtitle)
export class UpdateVideosSubtitleResolver {
  constructor(
    private readonly updateVideosSubtitleService: UpdateVideosSubtitleService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => VideosSubtitle)
  async updateVideosSubtitle(@Args('input') data: UpdateVideosSubtitleInput) {
    const response = await this.updateVideosSubtitleService.execute(data);
    return response;
  }
}
