import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosTagUpdatedEvent } from '@/events/implements/videos-tags/videos-tag-updated.event';

@EventsHandler(VideosTagUpdatedEvent)
export class VideosTagUpdatedHandler
  implements IEventHandler<VideosTagUpdatedEvent>
{
  async handle(event: VideosTagUpdatedEvent) {
    const { videosTag } = event;
    Logger.log(`#${videosTag.id} - updated!`, VideosTagUpdatedHandler.name);
    return event;
  }
}
