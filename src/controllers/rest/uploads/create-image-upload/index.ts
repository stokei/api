import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { ErrorUploadingFileException } from '@/errors';
import { CreateImageUploadURLService } from '@/services/files/create-image-upload-url';

@ApiTags(REST_CONTROLLERS_URL_NAMES.UPLOADS_IMAGES)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.UPLOADS_IMAGES,
  version: REST_VERSIONS.V1
})
export class CreateImageUploadController {
  constructor(
    private readonly createImageUploadURLService: CreateImageUploadURLService
  ) {}

  @Post()
  async createImageUpload(@Req() request: Request, @Res() response: Response) {
    try {
      const result = await this.createImageUploadURLService.execute({
        app: 'app_stokei',
        createdBy: 'acc_stokei'
      });
      const destination = result.uploadURL;
      return response
        .set({
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Expose-Headers': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*',
          Location: destination
        })
        .json({ file: result.file });
    } catch (error) {
      throw new ErrorUploadingFileException();
    }
  }
}
