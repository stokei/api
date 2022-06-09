import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoRemovedEvent } from '@/events/implements/videos/video-removed.event';

@EventsHandler(VideoRemovedEvent)
export class VideoRemovedHandler implements IEventHandler<VideoRemovedEvent> {
  async handle(event: VideoRemovedEvent) {
    const { video } = event;
    Logger.log(`#${video.id} - removed!`, VideoRemovedHandler.name);
    return event;
  }
}
