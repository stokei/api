import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosTagCreatedEvent } from '@/events/implements/videos-tags/videos-tag-created.event';

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
