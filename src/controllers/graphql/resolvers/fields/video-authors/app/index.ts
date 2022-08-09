import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { VideoAuthorModel } from '@/models/video-author.model';

@Resolver(() => VideoAuthor)
export class VideoAuthorAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() videoAuthor: VideoAuthorModel) {
    return videoAuthor.app && this.appsLoader.findByIds.load(videoAuthor.app);
  }
}
