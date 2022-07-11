import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ModuleVideosLoader } from '@/controllers/graphql/dataloaders/module-videos.loader';
import { ModuleVideo } from '@/controllers/graphql/types/module-video';

@Resolver(() => ModuleVideo)
export class ModuleVideoReferenceResolver {
  constructor(private readonly moduleVideosLoader: ModuleVideosLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.moduleVideosLoader.findByIds.load(reference.id);
  }
}
