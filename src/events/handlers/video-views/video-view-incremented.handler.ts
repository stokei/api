import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoViewIncrementedEvent } from '@/events/implements/video-views/video-view-incremented.event';

@EventsHandler(VideoViewIncrementedEvent)
export class VideoViewIncrementedHandler
  implements IEventHandler<VideoViewIncrementedEvent>
{
  async handle(event: VideoViewIncrementedEvent) {
    return event;
  }
}
