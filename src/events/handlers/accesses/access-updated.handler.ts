import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccessUpdatedEvent } from '@/events/implements/accesses/access-updated.event';

@EventsHandler(AccessUpdatedEvent)
export class AccessUpdatedHandler implements IEventHandler<AccessUpdatedEvent> {
  async handle(event: AccessUpdatedEvent) {
    const { access } = event;
    Logger.log(`#${access.id} - access updated!`, AccessUpdatedHandler.name);
    return event;
  }
}
