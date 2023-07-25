import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { axiosClient } from '@/clients/axios';
import { CLOUDFLARE_DELETE_VIDEO_BASE_URL } from '@/constants/cloudflare';
import { RemoveCloudflareVideoDTO } from '@/dtos/cloudflare/remove-cloudflare-video.dto';
import { CLOUDFLARE_TOKEN } from '@/environments';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

@Injectable()
export class RemoveCloudflareVideoService
  implements IBaseService<RemoveCloudflareVideoDTO, Promise<boolean>>
{
  async execute(data: RemoveCloudflareVideoDTO): Promise<boolean> {
    try {
      await axiosClient.delete(
        appendPathnameToURL(CLOUDFLARE_DELETE_VIDEO_BASE_URL, data?.filename),
        {
          headers: {
            'Content-Type': 'application/json',
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
