import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FileEncodingStartedEvent } from '@/events/implements/files/file-encoding-started.event';

@EventsHandler(FileEncodingStartedEvent)
export class FileEncodingStartedHandler
  implements IEventHandler<FileEncodingStartedEvent>
{
  async handle(event: FileEncodingStartedEvent) {
    const { file } = event;
    Logger.log(
      `#${file.id} - encoding started!`,
      FileEncodingStartedHandler.name
    );
    return event;
  }
}
