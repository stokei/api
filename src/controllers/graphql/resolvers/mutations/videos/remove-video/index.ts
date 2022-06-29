import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveVideoInput } from '@/controllers/graphql/inputs/videos/remove-video.input';
import { Video } from '@/controllers/graphql/types/video';
import { RemoveVideoService } from '@/services/videos/remove-video';

@Resolver(() => Video)
export class RemoveVideoResolver {
  constructor(private readonly removeVideoService: RemoveVideoService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Video)
  async removeVideo(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveVideoInput
  ) {
    const response = await this.removeVideoService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
