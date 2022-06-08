import { Resolver, ResolveReference } from '@nestjs/graphql';
import { VideosLoader } from '@/controllers/graphql/dataloaders/videos.loader';
import { Video } from '@/controllers/graphql/types/video';

@Resolver(() => Video)
export class VideoReferenceResolver {
  constructor(private readonly videosLoader: VideosLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.videosLoader.findByIds.load(reference.id);
  }
}
