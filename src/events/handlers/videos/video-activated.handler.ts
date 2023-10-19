import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoActivatedEvent } from '@/events/implements/videos/video-activated.event';

@EventsHandler(VideoActivatedEvent)
export class VideoActivatedHandler
  implements IEventHandler<VideoActivatedEvent>
{
  async handle(event: VideoActivatedEvent) {
    const { video } = event;
    Logger.log(`#${video.id} - activated!`, VideoActivatedHandler.name);
    return event;
  }
}
