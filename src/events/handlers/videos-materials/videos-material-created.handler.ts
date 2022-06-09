import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosMaterialCreatedEvent } from '@/events/implements/videos-materials/videos-material-created.event';

@EventsHandler(VideosMaterialCreatedEvent)
export class VideosMaterialCreatedHandler
  implements IEventHandler<VideosMaterialCreatedEvent>
{
  async handle(event: VideosMaterialCreatedEvent) {
    const { videosMaterial } = event;
    Logger.log(
      `#${videosMaterial.id} - created!`,
      VideosMaterialCreatedHandler.name
    );
    return event;
  }
}
