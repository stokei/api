import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccessCreatedEvent } from '@/events/implements/accesses/access-created.event';

@EventsHandler(AccessCreatedEvent)
export class AccessCreatedHandler implements IEventHandler<AccessCreatedEvent> {
  async handle(event: AccessCreatedEvent) {
    const { access, account } = event;
    Logger.log(
      `#${access.id} - ${account?.email} access created!`,
      AccessCreatedHandler.name
    );
    return event;
  }
}
