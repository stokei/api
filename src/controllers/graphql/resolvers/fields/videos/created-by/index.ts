import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Video } from '@/controllers/graphql/types/video';
import { VideoModel } from '@/models/video.model';

@Resolver(() => Video)
export class VideoCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() video: VideoModel) {
    return (
      video.createdBy && this.accountsLoader.findByIds.load(video.createdBy)
    );
  }
}
