import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModuleUpdatedEvent } from '@/events/implements/modules/module-updated.event';

@EventsHandler(ModuleUpdatedEvent)
export class ModuleUpdatedHandler implements IEventHandler<ModuleUpdatedEvent> {
  async handle(event: ModuleUpdatedEvent) {
    const { module } = event;
    Logger.log(`#${module.id} - updated!`, ModuleUpdatedHandler.name);
    return event;
  }
}
