import { Args, Query, Resolver } from '@nestjs/graphql';

import { VideosLoader } from '@/controllers/graphql/dataloaders/videos.loader';
import { Video } from '@/controllers/graphql/types/video';
import { ParamNotFoundException, VideoNotFoundException } from '@/errors';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videosLoader: VideosLoader) {}

  @Query(() => Video)
  async video(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const video = await this.videosLoader.findByIds.load(id);
    if (!video) {
      throw new VideoNotFoundException();
    }
    return video;
  }
}
