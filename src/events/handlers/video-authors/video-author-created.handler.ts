import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoAuthorCreatedEvent } from '@/events/implements/video-authors/video-author-created.event';

@EventsHandler(VideoAuthorCreatedEvent)
export class VideoAuthorCreatedHandler
  implements IEventHandler<VideoAuthorCreatedEvent>
{
  async handle(event: VideoAuthorCreatedEvent) {
    const { videoAuthor } = event;
    Logger.log(`#${videoAuthor.id} - created!`, VideoAuthorCreatedHandler.name);
    return event;
  }
}
