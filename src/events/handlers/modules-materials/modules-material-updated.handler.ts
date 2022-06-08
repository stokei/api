import { ModulesMaterialUpdatedEvent } from '@/events/implements/modules-materials/modules-material-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ModulesMaterialUpdatedEvent)
export class ModulesMaterialUpdatedHandler
  implements IEventHandler<ModulesMaterialUpdatedEvent>
{
  async handle(event: ModulesMaterialUpdatedEvent) {
    const { modulesMaterial } = event;
    Logger.log(
      `#${modulesMaterial.id} - updated!`,
      ModulesMaterialUpdatedHandler.name
    );
    return event;
  }
}
