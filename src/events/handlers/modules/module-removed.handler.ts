import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModuleRemovedEvent } from '@/events/implements/modules/module-removed.event';

@EventsHandler(ModuleRemovedEvent)
export class ModuleRemovedHandler implements IEventHandler<ModuleRemovedEvent> {
  async handle(event: ModuleRemovedEvent) {
    const { module } = event;
    Logger.log(`#${module.id} - removed!`, ModuleRemovedHandler.name);
    return event;
  }
}
