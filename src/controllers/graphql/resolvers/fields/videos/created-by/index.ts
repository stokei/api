import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Video } from '@/controllers/graphql/types/video';
import { VideoModel } from '@/models/video.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Video)
export class VideoCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() video: VideoModel) {
    return this.findAccountByIdService.execute(video.createdBy);
  }
}
