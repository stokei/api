import { Resolver, ResolveReference } from '@nestjs/graphql';

import { VideosAuthorsLoader } from '@/controllers/graphql/dataloaders/videos-authors.loader';
import { VideosAuthor } from '@/controllers/graphql/types/videos-author';

@Resolver(() => VideosAuthor)
export class VideosAuthorReferenceResolver {
  constructor(private readonly videosAuthorsLoader: VideosAuthorsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.videosAuthorsLoader.findByIds.load(reference.id);
  }
}
