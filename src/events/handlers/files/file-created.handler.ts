import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FileCreatedEvent } from '@/events/implements/files/file-created.event';

@EventsHandler(FileCreatedEvent)
export class FileCreatedHandler implements IEventHandler<FileCreatedEvent> {
  async handle(event: FileCreatedEvent) {
    const { file } = event;
    Logger.log(`#${file.id} - created!`, FileCreatedHandler.name);
    return event;
  }
}
