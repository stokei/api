import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Video } from '@/controllers/graphql/types/video';
import { VideoModel } from '@/models/video.model';

@Resolver(() => Video)
export class VideoAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() video: VideoModel) {
    return video.app && this.appsLoader.findByIds.load(video.app);
  }
}
