import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FileActivatedEvent } from '@/events/implements/files/file-activated.event';

@EventsHandler(FileActivatedEvent)
export class FileActivatedHandler implements IEventHandler<FileActivatedEvent> {
  async handle(event: FileActivatedEvent) {
    const { file } = event;
    Logger.log(`#${file.id} - activated!`, FileActivatedHandler.name);
    return event;
  }
}
