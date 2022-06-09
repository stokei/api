import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccessRemovedEvent } from '@/events/implements/accesses/access-removed.event';

@EventsHandler(AccessRemovedEvent)
export class AccessRemovedHandler implements IEventHandler<AccessRemovedEvent> {
  async handle(event: AccessRemovedEvent) {
    const { access } = event;
    Logger.log(`#${access.id} - access removed!`, AccessRemovedHandler.name);
    return event;
  }
}
