import { FileRemovedEvent } from '@/events/implements/files/file-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(FileRemovedEvent)
export class FileRemovedHandler implements IEventHandler<FileRemovedEvent> {
  async handle(event: FileRemovedEvent) {
    const { file } = event;
    Logger.log(`#${file.id} - removed!`, FileRemovedHandler.name);
    return event;
  }
}
