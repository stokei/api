import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { ErrorUploadingFileException, FileNotFoundException } from '@/errors';
import { CreateCloudflareVideoUploadURLService } from '@/services/cloudflare/create-video-upload-url';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { UpdateFileService } from '@/services/files/update-file';

@ApiTags(REST_CONTROLLERS_URL_NAMES.UPLOADS.BASE)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.UPLOADS.VIDEOS,
  version: REST_VERSIONS.V1
})
export class CreateVideoUploadController {
  constructor(
    private readonly findFileByIdService: FindFileByIdService,
    private readonly updateFileService: UpdateFileService,
    private readonly createCloudflareVideoUploadURLService: CreateCloudflareVideoUploadURLService
  ) {}

  @Post()
  async createVideoUpload(@Req() request: Request, @Res() response: Response) {
    try {
      const fileId = request.query?.file;
      if (!fileId) {
        throw new FileNotFoundException();
      }
      const file = await this.findFileByIdService.execute(fileId + '');
      const cloudflareVideoUploadURL =
        await this.createCloudflareVideoUploadURLService.execute({
          file: file.id,
          tusResumable: request.headers['tus-resumable'] as string,
          uploadLength: request.headers['upload-length'] as string,
          uploadMetadata: request.headers['upload-metadata'] as string
        });
      const destination = cloudflareVideoUploadURL.uploadURL;
      const filename = cloudflareVideoUploadURL.filename;
      return response
        .set({
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Expose-Headers': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*',
          Location: destination
        })
        .json({ filename });
    } catch (error) {
      throw new ErrorUploadingFileException();
    }
  }
}
