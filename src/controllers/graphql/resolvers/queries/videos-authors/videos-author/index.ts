import { Args, Query, Resolver } from '@nestjs/graphql';

import { VideosAuthorsLoader } from '@/controllers/graphql/dataloaders/videos-authors.loader';
import { VideosAuthor } from '@/controllers/graphql/types/videos-author';
import {
  ParamNotFoundException,
  VideosAuthorNotFoundException
} from '@/errors';

@Resolver(() => VideosAuthor)
export class VideosAuthorResolver {
  constructor(private readonly videosAuthorsLoader: VideosAuthorsLoader) {}

  @Query(() => VideosAuthor)
  async videosAuthor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const videosAuthor = await this.videosAuthorsLoader.findByIds.load(id);
    if (!videosAuthor) {
      throw new VideosAuthorNotFoundException();
    }
    return videosAuthor;
  }
}
