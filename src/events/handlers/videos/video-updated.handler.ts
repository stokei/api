import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoUpdatedEvent } from '@/events/implements/videos/video-updated.event';

@EventsHandler(VideoUpdatedEvent)
export class VideoUpdatedHandler implements IEventHandler<VideoUpdatedEvent> {
  async handle(event: VideoUpdatedEvent) {
    const { video } = event;
    Logger.log(`#${video.id} - updated!`, VideoUpdatedHandler.name);
    return event;
  }
}
