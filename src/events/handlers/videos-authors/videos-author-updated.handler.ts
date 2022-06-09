import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosAuthorUpdatedEvent } from '@/events/implements/videos-authors/videos-author-updated.event';

@EventsHandler(VideosAuthorUpdatedEvent)
export class VideosAuthorUpdatedHandler
  implements IEventHandler<VideosAuthorUpdatedEvent>
{
  async handle(event: VideosAuthorUpdatedEvent) {
    const { videosAuthor } = event;
    Logger.log(
      `#${videosAuthor.id} - updated!`,
      VideosAuthorUpdatedHandler.name
    );
    return event;
  }
}
