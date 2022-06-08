import { Args, Query, Resolver } from '@nestjs/graphql';
import { VideosTagsLoader } from '@/controllers/graphql/dataloaders/videos-tags.loader';
import { VideosTag } from '@/controllers/graphql/types/videos-tag';
import { VideosTagNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => VideosTag)
export class VideosTagResolver {
  constructor(private readonly videosTagsLoader: VideosTagsLoader) {}

  @Query(() => VideosTag)
  async videosTag(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const videosTag = await this.videosTagsLoader.findByIds.load(id);
    if (!videosTag) {
      throw new VideosTagNotFoundException();
    }
    return videosTag;
  }
}
