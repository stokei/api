import { FileUpdatedEvent } from '@/events/implements/files/file-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(FileUpdatedEvent)
export class FileUpdatedHandler implements IEventHandler<FileUpdatedEvent> {
  async handle(event: FileUpdatedEvent) {
    const { file } = event;
    Logger.log(`#${file.id} - updated!`, FileUpdatedHandler.name);
    return event;
  }
}
