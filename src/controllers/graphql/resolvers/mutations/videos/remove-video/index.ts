import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveVideoInput } from '@/controllers/graphql/inputs/videos/remove-video.input';
import { Video } from '@/controllers/graphql/types/video';
import { RemoveVideoService } from '@/services/videos/remove-video';

@Resolver(() => Video)
export class RemoveVideoResolver {
  constructor(private readonly removeVideoService: RemoveVideoService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Video)
  async removeVideo(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveVideoInput
  ) {
    const response = await this.removeVideoService.execute({
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
