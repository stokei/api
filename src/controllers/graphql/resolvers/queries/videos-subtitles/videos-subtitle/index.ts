import { Args, Query, Resolver } from '@nestjs/graphql';

import { VideosSubtitlesLoader } from '@/controllers/graphql/dataloaders/videos-subtitles.loader';
import { VideosSubtitle } from '@/controllers/graphql/types/videos-subtitle';
import {
  ParamNotFoundException,
  VideosSubtitleNotFoundException
} from '@/errors';

@Resolver(() => VideosSubtitle)
export class VideosSubtitleResolver {
  constructor(private readonly videosSubtitlesLoader: VideosSubtitlesLoader) {}

  @Query(() => VideosSubtitle)
  async videosSubtitle(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const videosSubtitle = await this.videosSubtitlesLoader.findByIds.load(id);
    if (!videosSubtitle) {
      throw new VideosSubtitleNotFoundException();
    }
    return videosSubtitle;
  }
}
