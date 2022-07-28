import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateVideoInput } from '@/controllers/graphql/inputs/videos/update-video.input';
import { Video } from '@/controllers/graphql/types/video';
import { UpdateVideoService } from '@/services/videos/update-video';

@Resolver(() => Video)
export class UpdateVideoResolver {
  constructor(private readonly updateVideoService: UpdateVideoService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Video)
  async updateVideo(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: UpdateVideoInput
  ) {
    const response = await this.updateVideoService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
