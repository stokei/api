import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationConfig } from '@stokei/nestjs';
import { Response } from 'express';
import { createReadStream } from 'fs';
import path from 'path';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { PATH_FILES } from '@/constants/upload-file-paths';

@ApiTags(REST_CONTROLLERS_URL_NAMES.FILES)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.FILES,
  version: REST_VERSIONS.V1
})
export class GetFileController {
  @Get(':file')
  @AuthenticationConfig({ isRequired: false })
  async getFile(
    @Param('file') file: any,
    @Res({ passthrough: true }) response: Response
  ) {
    const stream = createReadStream(path.join(PATH_FILES, file));
    response.set({
      'Content-Disposition': `inline; file="${file}"`,
      'Content-Type': 'image/png'
    });
    return new StreamableFile(stream);
  }
}
