import { Args, Query, Resolver } from '@nestjs/graphql';
import { VideosMaterialsLoader } from '@/controllers/graphql/dataloaders/videos-materials.loader';
import { VideosMaterial } from '@/controllers/graphql/types/videos-material';
import {
  VideosMaterialNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => VideosMaterial)
export class VideosMaterialResolver {
  constructor(private readonly videosMaterialsLoader: VideosMaterialsLoader) {}

  @Query(() => VideosMaterial)
  async videosMaterial(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const videosMaterial = await this.videosMaterialsLoader.findByIds.load(id);
    if (!videosMaterial) {
      throw new VideosMaterialNotFoundException();
    }
    return videosMaterial;
  }
}
