import { Args, Query, Resolver } from '@nestjs/graphql';
import { ModulesVideosLoader } from '@/controllers/graphql/dataloaders/modules-videos.loader';
import { ModulesVideo } from '@/controllers/graphql/types/modules-video';
import {
  ModulesVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ModulesVideo)
export class ModulesVideoResolver {
  constructor(private readonly modulesVideosLoader: ModulesVideosLoader) {}

  @Query(() => ModulesVideo)
  async modulesVideo(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const modulesVideo = await this.modulesVideosLoader.findByIds.load(id);
    if (!modulesVideo) {
      throw new ModulesVideoNotFoundException();
    }
    return modulesVideo;
  }
}
