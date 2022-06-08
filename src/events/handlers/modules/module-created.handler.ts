import { ModuleCreatedEvent } from '@/events/implements/modules/module-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ModuleCreatedEvent)
export class ModuleCreatedHandler implements IEventHandler<ModuleCreatedEvent> {
  async handle(event: ModuleCreatedEvent) {
    const { module } = event;
    Logger.log(`#${module.id} - created!`, ModuleCreatedHandler.name);
    return event;
  }
}
