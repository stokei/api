import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosTagRemovedEvent } from '@/events/implements/videos-tags/videos-tag-removed.event';

@EventsHandler(VideosTagRemovedEvent)
export class VideosTagRemovedHandler
  implements IEventHandler<VideosTagRemovedEvent>
{
  async handle(event: VideosTagRemovedEvent) {
    const { videosTag } = event;
    Logger.log(`#${videosTag.id} - removed!`, VideosTagRemovedHandler.name);
    return event;
  }
}
