import { Args, Query, Resolver } from '@nestjs/graphql';

import { VideoAuthorsLoader } from '@/controllers/graphql/dataloaders/video-authors.loader';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { ParamNotFoundException, VideoAuthorNotFoundException } from '@/errors';

@Resolver(() => VideoAuthor)
export class VideoAuthorResolver {
  constructor(private readonly videoAuthorsLoader: VideoAuthorsLoader) {}

  @Query(() => VideoAuthor)
  async videoAuthor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const videoAuthor = await this.videoAuthorsLoader.findByIds.load(id);
    if (!videoAuthor) {
      throw new VideoAuthorNotFoundException();
    }
    return videoAuthor;
  }
}
