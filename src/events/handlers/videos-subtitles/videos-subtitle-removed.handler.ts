import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosSubtitleRemovedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-removed.event';

@EventsHandler(VideosSubtitleRemovedEvent)
export class VideosSubtitleRemovedHandler
  implements IEventHandler<VideosSubtitleRemovedEvent>
{
  async handle(event: VideosSubtitleRemovedEvent) {
    const { videosSubtitle } = event;
    Logger.log(
      `#${videosSubtitle.id} - removed!`,
      VideosSubtitleRemovedHandler.name
    );
    return event;
  }
}
