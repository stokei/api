import { VideoRemovedEvent } from '@/events/implements/videos/video-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(VideoRemovedEvent)
export class VideoRemovedHandler implements IEventHandler<VideoRemovedEvent> {
  async handle(event: VideoRemovedEvent) {
    const { video } = event;
    Logger.log(`#${video.id} - removed!`, VideoRemovedHandler.name);
    return event;
  }
}
