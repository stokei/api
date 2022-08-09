import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { VideoAuthorModel } from '@/models/video-author.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => VideoAuthor)
export class VideoAuthorUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() videoAuthor: VideoAuthorModel) {
    return this.findAccountByIdService.execute(videoAuthor.updatedBy);
  }
}
