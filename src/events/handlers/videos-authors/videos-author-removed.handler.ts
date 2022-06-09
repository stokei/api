import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosAuthorRemovedEvent } from '@/events/implements/videos-authors/videos-author-removed.event';

@EventsHandler(VideosAuthorRemovedEvent)
export class VideosAuthorRemovedHandler
  implements IEventHandler<VideosAuthorRemovedEvent>
{
  async handle(event: VideosAuthorRemovedEvent) {
    const { videosAuthor } = event;
    Logger.log(
      `#${videosAuthor.id} - removed!`,
      VideosAuthorRemovedHandler.name
    );
    return event;
  }
}
