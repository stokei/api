import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoAuthorRemovedEvent } from '@/events/implements/video-authors/video-author-removed.event';

@EventsHandler(VideoAuthorRemovedEvent)
export class VideoAuthorRemovedHandler
  implements IEventHandler<VideoAuthorRemovedEvent>
{
  async handle(event: VideoAuthorRemovedEvent) {
    const { videoAuthor } = event;
    Logger.log(`#${videoAuthor.id} - removed!`, VideoAuthorRemovedHandler.name);
    return event;
  }
}
