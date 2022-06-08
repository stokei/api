import { VideosSubtitleUpdatedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(VideosSubtitleUpdatedEvent)
export class VideosSubtitleUpdatedHandler
  implements IEventHandler<VideosSubtitleUpdatedEvent>
{
  async handle(event: VideosSubtitleUpdatedEvent) {
    const { videosSubtitle } = event;
    Logger.log(
      `#${videosSubtitle.id} - updated!`,
      VideosSubtitleUpdatedHandler.name
    );
    return event;
  }
}
