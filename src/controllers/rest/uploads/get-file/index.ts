import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationConfig } from '@stokei/nestjs';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import path from 'path';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { PATH_FILES } from '@/constants/upload-file-paths';
import { FileNotFoundException } from '@/errors';
import { FindFileByIdService } from '@/services/files/find-file-by-id';

@ApiTags(REST_CONTROLLERS_URL_NAMES.UPLOADS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.UPLOADS,
  version: REST_VERSIONS.V1
})
export class GetFileController {
  constructor(private readonly findFileByIdService: FindFileByIdService) {}

  @Get(':file')
  @AuthenticationConfig({ isRequired: false })
  async getFile(
    @Param('file') fileId: any,
    @Res({ passthrough: true }) response: Response
  ) {
    if (!fileId) {
      throw new FileNotFoundException();
    }
    const file = await this.findFileByIdService.execute(fileId);
    if (!file) {
      throw new FileNotFoundException();
    }
    const filePath = path.join(PATH_FILES, file.filenameAndExtension);
    if (!existsSync(filePath)) {
      throw new FileNotFoundException();
    }
    const stream = createReadStream(filePath);
    response.set({
      'Content-Disposition': `inline; file="${file.filenameAndExtension}"`,
      'Content-Type': file.mimetype
    });
    return new StreamableFile(stream);
  }
}
