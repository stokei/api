import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosMaterialRemovedEvent } from '@/events/implements/videos-materials/videos-material-removed.event';

@EventsHandler(VideosMaterialRemovedEvent)
export class VideosMaterialRemovedHandler
  implements IEventHandler<VideosMaterialRemovedEvent>
{
  async handle(event: VideosMaterialRemovedEvent) {
    const { videosMaterial } = event;
    Logger.log(
      `#${videosMaterial.id} - removed!`,
      VideosMaterialRemovedHandler.name
    );
    return event;
  }
}
