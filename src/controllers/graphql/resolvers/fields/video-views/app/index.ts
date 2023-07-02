import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { VideoView } from '@/controllers/graphql/types/video-view';
import { VideoViewModel } from '@/models/video-view.model';

@Resolver(() => VideoView)
export class VideoViewAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() videoView: VideoViewModel) {
    return videoView.app && this.appsLoader.findByIds.load(videoView.app);
  }
}
