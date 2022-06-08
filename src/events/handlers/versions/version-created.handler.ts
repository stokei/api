import { VersionCreatedEvent } from '@/events/implements/versions/version-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(VersionCreatedEvent)
export class VersionCreatedHandler
  implements IEventHandler<VersionCreatedEvent>
{
  async handle(event: VersionCreatedEvent) {
    const { version } = event;
    Logger.log(`#${version.id} - created!`, VersionCreatedHandler.name);
    return event;
  }
}
