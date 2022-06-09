import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosAuthorCreatedEvent } from '@/events/implements/videos-authors/videos-author-created.event';

@EventsHandler(VideosAuthorCreatedEvent)
export class VideosAuthorCreatedHandler
  implements IEventHandler<VideosAuthorCreatedEvent>
{
  async handle(event: VideosAuthorCreatedEvent) {
    const { videosAuthor } = event;
    Logger.log(
      `#${videosAuthor.id} - created!`,
      VideosAuthorCreatedHandler.name
    );
    return event;
  }
}
