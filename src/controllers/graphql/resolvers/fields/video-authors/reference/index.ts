import { Resolver, ResolveReference } from '@nestjs/graphql';

import { VideoAuthorsLoader } from '@/controllers/graphql/dataloaders/video-authors.loader';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';

@Resolver(() => VideoAuthor)
export class VideoAuthorReferenceResolver {
  constructor(private readonly videoAuthorsLoader: VideoAuthorsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.videoAuthorsLoader.findByIds.load(reference.id);
  }
}
