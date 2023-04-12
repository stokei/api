import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';
import { Video } from '@/controllers/graphql/types/video';
import { VideoModel } from '@/models/video.model';

@Resolver(() => Video)
export class VideoImageResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image, { nullable: true })
  poster(@Parent() video: VideoModel) {
    return video.poster && this.imagesLoader.findByIds.load(video.poster);
  }
}
