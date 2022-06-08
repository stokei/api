import { Resolver, ResolveReference } from '@nestjs/graphql';
import { VideosTagsLoader } from '@/controllers/graphql/dataloaders/videos-tags.loader';
import { VideosTag } from '@/controllers/graphql/types/videos-tag';

@Resolver(() => VideosTag)
export class VideosTagReferenceResolver {
  constructor(private readonly videosTagsLoader: VideosTagsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.videosTagsLoader.findByIds.load(reference.id);
  }
}
