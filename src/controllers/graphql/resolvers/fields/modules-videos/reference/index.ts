import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ModulesVideosLoader } from '@/controllers/graphql/dataloaders/modules-videos.loader';
import { ModulesVideo } from '@/controllers/graphql/types/modules-video';

@Resolver(() => ModulesVideo)
export class ModulesVideoReferenceResolver {
  constructor(private readonly modulesVideosLoader: ModulesVideosLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.modulesVideosLoader.findByIds.load(reference.id);
  }
}
