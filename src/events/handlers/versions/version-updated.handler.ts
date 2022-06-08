import { VersionUpdatedEvent } from '@/events/implements/versions/version-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(VersionUpdatedEvent)
export class VersionUpdatedHandler
  implements IEventHandler<VersionUpdatedEvent>
{
  async handle(event: VersionUpdatedEvent) {
    const { version } = event;
    Logger.log(`#${version.id} - updated!`, VersionUpdatedHandler.name);
    return event;
  }
}
