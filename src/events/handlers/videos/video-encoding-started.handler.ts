import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoEncodingStartedEvent } from '@/events/implements/videos/video-encoding-started.event';

@EventsHandler(VideoEncodingStartedEvent)
export class VideoEncodingStartedHandler
  implements IEventHandler<VideoEncodingStartedEvent>
{
  async handle(event: VideoEncodingStartedEvent) {
    const { video } = event;
    Logger.log(
      `#${video.id} - encoding started!`,
      VideoEncodingStartedHandler.name
    );
    return event;
  }
}
