import { VideosSubtitleCreatedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(VideosSubtitleCreatedEvent)
export class VideosSubtitleCreatedHandler
  implements IEventHandler<VideosSubtitleCreatedEvent>
{
  async handle(event: VideosSubtitleCreatedEvent) {
    const { videosSubtitle } = event;
    Logger.log(
      `#${videosSubtitle.id} - created!`,
      VideosSubtitleCreatedHandler.name
    );
    return event;
  }
}
