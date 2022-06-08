import { VideosMaterialCreatedEvent } from '@/events/implements/videos-materials/videos-material-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
