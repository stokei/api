import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoAuthorUpdatedEvent } from '@/events/implements/video-authors/video-author-updated.event';

@EventsHandler(VideoAuthorUpdatedEvent)
export class VideoAuthorUpdatedHandler
  implements IEventHandler<VideoAuthorUpdatedEvent>
{
  async handle(event: VideoAuthorUpdatedEvent) {
    const { videoAuthor } = event;
    Logger.log(`#${videoAuthor.id} - updated!`, VideoAuthorUpdatedHandler.name);
    return event;
  }
}
