import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateVideosSubtitleInput } from '@/controllers/graphql/inputs/videos-subtitles/create-videos-subtitle.input';
import { VideosSubtitle } from '@/controllers/graphql/types/videos-subtitle';
import { CreateVideosSubtitleService } from '@/services/videos-subtitles/create-videos-subtitle';

@Resolver(() => VideosSubtitle)
export class CreateVideosSubtitleResolver {
  constructor(
    private readonly createVideosSubtitleService: CreateVideosSubtitleService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => VideosSubtitle)
  async createVideosSubtitle(@Args('input') data: CreateVideosSubtitleInput) {
    const response = await this.createVideosSubtitleService.execute(data);
    return response;
  }
}
