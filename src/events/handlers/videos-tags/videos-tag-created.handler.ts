import { VideosTagCreatedEvent } from '@/events/implements/videos-tags/videos-tag-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(VideosTagCreatedEvent)
export class VideosTagCreatedHandler
  implements IEventHandler<VideosTagCreatedEvent>
{
  async handle(event: VideosTagCreatedEvent) {
    const { videosTag } = event;
    Logger.log(`#${videosTag.id} - created!`, VideosTagCreatedHandler.name);
    return event;
  }
}
