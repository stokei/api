import { Resolver, ResolveReference } from '@nestjs/graphql';

import { VideosMaterialsLoader } from '@/controllers/graphql/dataloaders/videos-materials.loader';
import { VideosMaterial } from '@/controllers/graphql/types/videos-material';

@Resolver(() => VideosMaterial)
export class VideosMaterialReferenceResolver {
  constructor(private readonly videosMaterialsLoader: VideosMaterialsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.videosMaterialsLoader.findByIds.load(reference.id);
  }
}
