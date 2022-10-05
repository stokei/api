import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FileUpdatedEvent } from '@/events/implements/files/file-updated.event';

@EventsHandler(FileUpdatedEvent)
export class FileUpdatedHandler implements IEventHandler<FileUpdatedEvent> {
  async handle(event: FileUpdatedEvent) {
    const { file } = event;
    Logger.log(`#${file.id} - updated!`, FileUpdatedHandler.name);
    return event;
  }
}
