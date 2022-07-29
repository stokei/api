import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  AuthenticationConfig,
  CurrentAccount
} from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { CreateVideoDTO } from '@/dtos/videos/create-video.dto';
import { VideoModel } from '@/models/video.model';
import { CreateVideoService } from '@/services/videos/create-video';

@ApiTags(REST_CONTROLLERS_URL_NAMES.VIDEOS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.VIDEOS,
  version: REST_VERSIONS.V1
})
export class CreateVideoController {
  constructor(private readonly createVideoService: CreateVideoService) {}

  @Post()
  @UseGuards(AuthenticatedGuard, AppGuard)
  @AuthenticationConfig({ isRequired: false })
  @ApiCreatedResponse({
    description: 'The video has been successfully created.',
    type: VideoModel
  })
  async createVideo(
    @Body() data: CreateVideoDTO,
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string
  ) {
    return this.createVideoService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
  }
}
