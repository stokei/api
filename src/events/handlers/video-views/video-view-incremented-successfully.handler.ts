import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoViewIncrementedSuccessfullyEvent } from '@/events/implements/video-views/video-view-incremented-successfully.event';

@EventsHandler(VideoViewIncrementedSuccessfullyEvent)
export class VideoViewIncrementedSuccessfullyHandler
  implements IEventHandler<VideoViewIncrementedSuccessfullyEvent>
{
  async handle(event: VideoViewIncrementedSuccessfullyEvent) {
    return event;
  }
}
