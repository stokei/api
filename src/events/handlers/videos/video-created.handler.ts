import { VideoCreatedEvent } from '@/events/implements/videos/video-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(VideoCreatedEvent)
export class VideoCreatedHandler implements IEventHandler<VideoCreatedEvent> {
  async handle(event: VideoCreatedEvent) {
    const { video } = event;
    Logger.log(`#${video.id} - created!`, VideoCreatedHandler.name);
    return event;
  }
}
