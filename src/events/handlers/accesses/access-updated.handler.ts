import { AccessUpdatedEvent } from '@/events/implements/accesses/access-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AccessUpdatedEvent)
export class AccessUpdatedHandler implements IEventHandler<AccessUpdatedEvent> {
  async handle(event: AccessUpdatedEvent) {
    const { access } = event;
    Logger.log(`#${access.id} - access updated!`, AccessUpdatedHandler.name);
    return event;
  }
}
