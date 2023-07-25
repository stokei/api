import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { axiosClient } from '@/clients/axios';
import { CLOUDFLARE_DELETE_IMAGE_BASE_URL } from '@/constants/cloudflare';
import { RemoveCloudflareImageDTO } from '@/dtos/cloudflare/remove-cloudflare-image.dto';
import { CLOUDFLARE_TOKEN } from '@/environments';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

@Injectable()
export class RemoveCloudflareImageService
  implements IBaseService<RemoveCloudflareImageDTO, Promise<boolean>>
{
  async execute(data: RemoveCloudflareImageDTO): Promise<boolean> {
    try {
      await axiosClient.delete(
        appendPathnameToURL(CLOUDFLARE_DELETE_IMAGE_BASE_URL, data?.filename),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${CLOUDFLARE_TOKEN}`
          }
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
