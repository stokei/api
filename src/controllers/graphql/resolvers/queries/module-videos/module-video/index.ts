import { Args, Query, Resolver } from '@nestjs/graphql';

import { ModuleVideosLoader } from '@/controllers/graphql/dataloaders/module-videos.loader';
import { ModuleVideo } from '@/controllers/graphql/types/module-video';
import { ModuleVideoNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => ModuleVideo)
export class ModuleVideoResolver {
  constructor(private readonly moduleVideosLoader: ModuleVideosLoader) {}

  @Query(() => ModuleVideo)
  async moduleVideo(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const moduleVideo = await this.moduleVideosLoader.findByIds.load(id);
    if (!moduleVideo) {
      throw new ModuleVideoNotFoundException();
    }
    return moduleVideo;
  }
}
