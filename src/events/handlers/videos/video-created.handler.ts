import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoCreatedEvent } from '@/events/implements/videos/video-created.event';

@EventsHandler(VideoCreatedEvent)
export class VideoCreatedHandler implements IEventHandler<VideoCreatedEvent> {
  async handle(event: VideoCreatedEvent) {
    const { video } = event;
    Logger.log(`#${video.id} - created!`, VideoCreatedHandler.name);
    return event;
  }
}
