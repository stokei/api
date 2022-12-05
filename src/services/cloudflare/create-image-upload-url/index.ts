import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { axiosClient } from '@/clients/axios';
import { CLOUDFLARE_CREATE_IMAGE_UPLOAD_URL } from '@/constants/cloudflare';
import { CreateCloudflareImageUploadURLDTO } from '@/dtos/cloudflare/create-image-upload-url.dto';
import { CreateCloudflareImageUploadURLResponse } from '@/dtos/cloudflare/create-image-upload-url-response.dto';
import { CLOUDFLARE_TOKEN } from '@/environments';
import { ErrorUploadingFileException } from '@/errors';

@Injectable()
export class CreateCloudflareImageUploadURLService
  implements
    IBaseService<
      CreateCloudflareImageUploadURLDTO,
      Promise<CreateCloudflareImageUploadURLResponse>
    >
{
  async execute(): Promise<CreateCloudflareImageUploadURLResponse> {
    const response = await axiosClient.post(
      CLOUDFLARE_CREATE_IMAGE_UPLOAD_URL,
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
