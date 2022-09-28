import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationConfig } from '@stokei/nestjs';
import { Response } from 'express';
import { createReadStream } from 'fs';
import path from 'path';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { PATH_VIDEOS } from '@/constants/upload-file-paths';

@ApiTags(REST_CONTROLLERS_URL_NAMES.VIDEOS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.VIDEOS,
  version: REST_VERSIONS.V1
})
export class GetVideoController {
  @Get(':filename')
  @AuthenticationConfig({ isRequired: false })
  async getVideo(
    @Param('filename') filename: any,
    @Res({ passthrough: true }) response: Response
  ) {
    const stream = createReadStream(path.join(PATH_VIDEOS, filename));
    response.set({
      'Content-Disposition': `inline; filename="${filename}"`,
      'Content-Type': 'video/mp4'
    });
    return new StreamableFile(stream);
  }
}
