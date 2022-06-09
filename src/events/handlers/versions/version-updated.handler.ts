import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VersionUpdatedEvent } from '@/events/implements/versions/version-updated.event';

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
