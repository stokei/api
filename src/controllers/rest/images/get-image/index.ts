import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationConfig } from '@stokei/nestjs';
import { Response } from 'express';
import { createReadStream } from 'fs';
import path from 'path';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { PATH_IMAGES } from '@/constants/upload-file-paths';

@ApiTags(REST_CONTROLLERS_URL_NAMES.IMAGES)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.IMAGES,
  version: REST_VERSIONS.V1
})
export class GetImageController {
  @Get(':filename')
  @AuthenticationConfig({ isRequired: false })
  async getImage(
    @Param('filename') filename: any,
    @Res({ passthrough: true }) response: Response
  ) {
    const stream = createReadStream(path.join(PATH_IMAGES, filename));
    response.set({
      'Content-Disposition': `inline; filename="${filename}"`,
      'Content-Type': 'image/png'
    });
    return new StreamableFile(stream);
  }
}
