import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RoleCreatedEvent } from '@/events/implements/roles/role-created.event';

@EventsHandler(RoleCreatedEvent)
export class RoleCreatedHandler implements IEventHandler<RoleCreatedEvent> {
  async handle(event: RoleCreatedEvent) {
    const { role } = event;
    Logger.log(`#${role.id} - created!`, RoleCreatedHandler.name);
    return event;
  }
}
