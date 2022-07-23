import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  AuthenticationConfig,
  CurrentAccount
} from '@stokei/nestjs';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { VideoModel } from '@/models/video.model';
import { RemoveVideoService } from '@/services/videos/remove-video';

@ApiTags(REST_CONTROLLERS_URL_NAMES.VIDEOS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.VIDEOS,
  version: REST_VERSIONS.V1
})
export class RemoveVideoController {
  constructor(private readonly removeVideoService: RemoveVideoService) {}

  @Delete()
  @UseGuards(AuthenticatedGuard)
  @AuthenticationConfig({ isRequired: false })
  @ApiOkResponse({
    description: 'The video has been successfully deleted.',
    type: VideoModel
  })
  async removeVideo(
    @Param('id') videoId: string,
    @CurrentAccount('id') currentAccountId: string
  ) {
    return this.removeVideoService.execute({
      where: {
        videoId,
        removedBy: currentAccountId
      }
    });
  }
}
