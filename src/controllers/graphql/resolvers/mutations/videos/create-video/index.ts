import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateVideoInput } from '@/controllers/graphql/inputs/videos/create-video.input';
import { Video } from '@/controllers/graphql/types/video';
import { CreateVideoService } from '@/services/videos/create-video';

@Resolver(() => Video)
export class CreateVideoResolver {
  constructor(private readonly createVideoService: CreateVideoService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Video)
  async createVideo(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: CreateVideoInput
  ) {
    const response = await this.createVideoService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
