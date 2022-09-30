import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService, ParamNotFoundException } from '@stokei/nestjs';

import { WebhookQencodeDTO } from '@/dtos/webhooks/webhook-qencode.dto';
import {
  QencodeSignatureNotFoundException,
  VideoNotFoundException
} from '@/errors';
import { FindVideoByIdService } from '@/services/videos/find-video-by-id';

@Injectable()
export class WebhookQencodeService implements IBaseService<WebhookQencodeDTO> {
  constructor(private readonly findVideoByIdService: FindVideoByIdService) {}
  async execute({ queryParams, body, signature }: WebhookQencodeDTO) {
    try {
    } catch (err) {
      if (!signature) {
        throw new QencodeSignatureNotFoundException();
      }
    }

    const videoId = queryParams?.video;
    if (!videoId) {
      throw new ParamNotFoundException('videoId');
    }
    const video = await this.findVideoByIdService.execute(videoId);
    if (!video) {
      throw new VideoNotFoundException();
    }
    console.log({ queryParams, body });

    const eventType = null;

    switch (eventType) {
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        return null;
      default:
        return { status: HttpStatus.OK };
    }
  }
}
