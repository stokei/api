import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModuleCreatedEvent } from '@/events/implements/modules/module-created.event';

@EventsHandler(ModuleCreatedEvent)
export class ModuleCreatedHandler implements IEventHandler<ModuleCreatedEvent> {
  async handle(event: ModuleCreatedEvent) {
    const { module } = event;
    Logger.log(`#${module.id} - created!`, ModuleCreatedHandler.name);
    return event;
  }
}
