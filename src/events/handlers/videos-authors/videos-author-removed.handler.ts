import { VideosAuthorRemovedEvent } from '@/events/implements/videos-authors/videos-author-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
