import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RoleRemovedEvent } from '@/events/implements/roles/role-removed.event';

@EventsHandler(RoleRemovedEvent)
export class RoleRemovedHandler implements IEventHandler<RoleRemovedEvent> {
  async handle(event: RoleRemovedEvent) {
    const { role } = event;
    Logger.log(`#${role.id} - removed!`, RoleRemovedHandler.name);
    return event;
  }
}
