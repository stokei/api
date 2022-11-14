import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { axiosClient } from '@/clients/axios';
import { CLOUDFLARE_CREATE_VIDEO_UPLOAD_URL } from '@/constants/cloudflare';
import { CreateCloudflareVideoUploadURLDTO } from '@/dtos/cloudflare/create-video-upload-url.dto';
import { CreateCloudflareVideoUploadURLResponse } from '@/dtos/cloudflare/create-video-upload-url-response.dto';
import { CLOUDFLARE_TOKEN } from '@/environments';
import { ErrorUploadingFileException } from '@/errors';

@Injectable()
export class CreateCloudflareVideoUploadURLService
  implements
    IBaseService<
      CreateCloudflareVideoUploadURLDTO,
      Promise<CreateCloudflareVideoUploadURLResponse>
    >
{
  async execute(): Promise<CreateCloudflareVideoUploadURLResponse> {
    const response = await axiosClient.post(
      CLOUDFLARE_CREATE_VIDEO_UPLOAD_URL,
      null,
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_TOKEN}`
        }
      }
    );
    if (!response.data) {
      throw new ErrorUploadingFileException();
    }
    return {
      uploadURL: response.data.result.uploadURL,
      filename: response.data.result.id
    };
  }
}
