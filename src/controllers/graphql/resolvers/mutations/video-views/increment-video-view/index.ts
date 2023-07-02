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
import { IncrementVideoViewInput } from '@/controllers/graphql/inputs/video-views/increment-video-view.input';
import { VideoView } from '@/controllers/graphql/types/video-view';
import { IncrementVideoViewService } from '@/services/video-views/increment-video-view';

@Resolver(() => VideoView)
export class IncrementVideoViewResolver {
  constructor(
    private readonly incrementVideoViewService: IncrementVideoViewService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @AuthenticationConfig({
    isRequired: false
  })
  @Mutation(() => Boolean)
  async incrementVideoView(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: IncrementVideoViewInput
  ) {
    await this.incrementVideoViewService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId || defaultAccountId
    });
    return true;
  }
}
