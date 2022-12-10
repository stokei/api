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
  async execute(
    data: CreateCloudflareVideoUploadURLDTO
  ): Promise<CreateCloudflareVideoUploadURLResponse> {
    try {
      const response = await axiosClient.post(
        CLOUDFLARE_CREATE_VIDEO_UPLOAD_URL,
        {
          allowedOrigins: ['*']
        },
        {
          headers: {
            Authorization: `Bearer ${CLOUDFLARE_TOKEN}`,
            'Tus-Resumable': data.tusResumable,
            'Content-Type': 'application/json',
            'Upload-Creator': data.createdBy,
            'Upload-Length': data.uploadLength,
            'Upload-Metadata': data.uploadMetadata
          }
        }
      );
      return {
        uploadURL: response.headers['location'],
        filename: response.headers['stream-media-id']
      };
    } catch (error) {
      throw new ErrorUploadingFileException();
    }
  }
}
