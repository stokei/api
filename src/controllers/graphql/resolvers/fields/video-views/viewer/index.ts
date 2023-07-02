import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { VideoView } from '@/controllers/graphql/types/video-view';
import { VideoViewModel } from '@/models/video-view.model';

@Resolver(() => VideoView)
export class VideoViewViewerResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  viewer(@Parent() videoView: VideoViewModel) {
    return (
      videoView.viewer && this.accountsLoader.findByIds.load(videoView.viewer)
    );
  }
}
