import { VideosAuthorUpdatedEvent } from '@/events/implements/videos-authors/videos-author-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
