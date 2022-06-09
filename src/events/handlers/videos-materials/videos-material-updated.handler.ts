import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideosMaterialUpdatedEvent } from '@/events/implements/videos-materials/videos-material-updated.event';

@EventsHandler(VideosMaterialUpdatedEvent)
export class VideosMaterialUpdatedHandler
  implements IEventHandler<VideosMaterialUpdatedEvent>
{
  async handle(event: VideosMaterialUpdatedEvent) {
    const { videosMaterial } = event;
    Logger.log(
      `#${videosMaterial.id} - updated!`,
      VideosMaterialUpdatedHandler.name
    );
    return event;
  }
}
