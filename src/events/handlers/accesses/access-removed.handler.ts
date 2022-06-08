import { AccessRemovedEvent } from '@/events/implements/accesses/access-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AccessRemovedEvent)
export class AccessRemovedHandler implements IEventHandler<AccessRemovedEvent> {
  async handle(event: AccessRemovedEvent) {
    const { access } = event;
    Logger.log(`#${access.id} - access removed!`, AccessRemovedHandler.name);
    return event;
  }
}
