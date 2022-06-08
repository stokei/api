import { VideosMaterialUpdatedEvent } from '@/events/implements/videos-materials/videos-material-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
