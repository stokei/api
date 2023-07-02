import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { IncrementVideoViewDTO } from '@/dtos/video-views/increment-video-view.dto';
import { VideoViewIncrementedEvent } from '@/events/implements/video-views/video-view-incremented.event';

@Injectable()
export class IncrementVideoViewService
  implements IBaseService<IncrementVideoViewDTO, Promise<void>>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(data: IncrementVideoViewDTO): Promise<void> {
    return await this.eventBus.publish(new VideoViewIncrementedEvent(data));
  }
}
