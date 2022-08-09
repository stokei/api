import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Video } from '@/controllers/graphql/types/video';
import { VideoModel } from '@/models/video.model';

@Resolver(() => Video)
export class VideoUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() video: VideoModel) {
    return (
      video.updatedBy && this.accountsLoader.findByIds.load(video.updatedBy)
    );
  }
}
