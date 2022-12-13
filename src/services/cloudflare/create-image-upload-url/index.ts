import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import FormData from 'form-data';

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
    let response;
    try {
      const formData = new FormData();

      formData.append('metadata', '{}');
      formData.append('requireSignedURLs', 'false');

      response = await axiosClient.post(
        CLOUDFLARE_CREATE_IMAGE_UPLOAD_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${CLOUDFLARE_TOKEN}`
          }
        }
      );
    } catch (error) {
      throw new ErrorUploadingFileException();
    }

    return {
      uploadURL: response.data.result.uploadURL,
      filename: response.data.result.id
    };
  }
}
