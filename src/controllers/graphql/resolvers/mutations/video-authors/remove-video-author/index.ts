import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveVideoAuthorInput } from '@/controllers/graphql/inputs/video-authors/remove-video-author.input';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { RemoveVideoAuthorService } from '@/services/video-authors/remove-video-author';

@Resolver(() => VideoAuthor)
export class RemoveVideoAuthorResolver {
  constructor(
    private readonly removeVideoAuthorService: RemoveVideoAuthorService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => VideoAuthor)
  async removeVideoAuthor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: RemoveVideoAuthorInput
  ) {
    const response = await this.removeVideoAuthorService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
