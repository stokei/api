import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthenticatedGuard,
  AuthenticationConfig,
  CurrentAccount
} from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { defaultAccountId } from '@/constants/default-account-id';
import { CreateVideoViewInput } from '@/controllers/graphql/inputs/video-views/create-video-view.input';
import { VideoView } from '@/controllers/graphql/types/video-view';
import { CreateVideoViewService } from '@/services/video-views/create-video-view';

@Resolver(() => VideoView)
export class CreateVideoViewResolver {
  constructor(
    private readonly createVideoViewService: CreateVideoViewService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @AuthenticationConfig({
    isRequired: false
  })
  @Mutation(() => VideoView)
  async createVideoView(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateVideoViewInput
  ) {
    const response = await this.createVideoViewService.execute({
      ...data,
      viewer: currentAccountId || defaultAccountId,
      app: appId,
      createdBy: currentAccountId || defaultAccountId
    });
    return response;
  }
}
