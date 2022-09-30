import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
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
import { VideoUploaderInterceptor } from '@/interceptors';
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
  @UseInterceptors(
    VideoUploaderInterceptor({
      fieldName: 'video'
    })
  )
  @ApiCreatedResponse({
    description: 'The video has been successfully created.',
    type: VideoModel
  })
  async createVideo(
    @Body() data: CreateVideoDTO,
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @UploadedFile() videoFile: any
  ) {
    return this.createVideoService.execute({
      ...data,
      filename: videoFile?.filename,
      app: appId,
      createdBy: currentAccountId
    });
  }
}
