import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Video } from '@/controllers/graphql/types/video';
import { VideoModel } from '@/models/video.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Video)
export class VideoAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() video: VideoModel) {
    return this.findAppByIdService.execute(video.app);
  }
}
