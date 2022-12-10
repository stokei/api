import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentAccount } from '@stokei/nestjs';
import { Request, Response } from 'express';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { ErrorUploadingFileException } from '@/errors';
import { CreateVideoUploadURLService } from '@/services/files/create-video-upload-url';

@ApiTags(REST_CONTROLLERS_URL_NAMES.UPLOADS_VIDEOS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.UPLOADS_VIDEOS,
  version: REST_VERSIONS.V1
})
export class CreateVideoUploadController {
  constructor(
    private readonly createVideoUploadURLService: CreateVideoUploadURLService
  ) {}

  @Post()
  @UseGuards(AppGuard)
  async createVideoUpload(
    @Req() request: Request,
    @Res() response: Response,
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string
  ) {
    try {
      const result = await this.createVideoUploadURLService.execute({
        tusResumable: request.headers['tus-resumable'] as string,
        uploadLength: request.headers['upload-length'] as string,
        uploadMetadata: request.headers['upload-metadata'] as string,
        app: appId,
        createdBy: currentAccountId
      });
      const destination = result.uploadURL;
      return response
        .set({
          'Access-Control-Expose-Headers': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          Location: destination
        })
        .json({ file: result.file });
    } catch (error) {
      throw new ErrorUploadingFileException();
    }
  }
}
