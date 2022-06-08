import { VideosTagRemovedEvent } from '@/events/implements/videos-tags/videos-tag-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
