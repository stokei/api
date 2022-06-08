import { ModuleUpdatedEvent } from '@/events/implements/modules/module-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ModuleUpdatedEvent)
export class ModuleUpdatedHandler implements IEventHandler<ModuleUpdatedEvent> {
  async handle(event: ModuleUpdatedEvent) {
    const { module } = event;
    Logger.log(`#${module.id} - updated!`, ModuleUpdatedHandler.name);
    return event;
  }
}
