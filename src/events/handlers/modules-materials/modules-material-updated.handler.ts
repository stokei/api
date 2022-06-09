import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModulesMaterialUpdatedEvent } from '@/events/implements/modules-materials/modules-material-updated.event';

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
