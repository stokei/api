import { VideosAuthorCreatedEvent } from '@/events/implements/videos-authors/videos-author-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
