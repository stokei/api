import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { VideoAuthorModel } from '@/models/video-author.model';

@Resolver(() => VideoAuthor)
export class VideoAuthorCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() videoAuthor: VideoAuthorModel) {
    return (
      videoAuthor.updatedBy &&
      this.accountsLoader.findByIds.load(videoAuthor.createdBy)
    );
  }
}
