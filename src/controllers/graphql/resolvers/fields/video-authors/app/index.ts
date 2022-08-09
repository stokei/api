import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { VideoAuthorModel } from '@/models/video-author.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => VideoAuthor)
export class VideoAuthorAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() videoAuthor: VideoAuthorModel) {
    return this.findAppByIdService.execute(videoAuthor.app);
  }
}
