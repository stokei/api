import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VideoUploadURLCreatedEvent } from '@/events/implements/files/video-upload-url-created.event';

@EventsHandler(VideoUploadURLCreatedEvent)
export class VideoUploadURLCreatedHandler
  implements IEventHandler<VideoUploadURLCreatedEvent>
{
  async handle(event: VideoUploadURLCreatedEvent) {
    const { filename } = event;
    Logger.log(
      `VideoUploadURL - Filename#${filename} - created!`,
      VideoUploadURLCreatedHandler.name
    );
    return event;
  }
}
