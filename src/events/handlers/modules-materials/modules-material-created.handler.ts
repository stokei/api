import { ModulesMaterialCreatedEvent } from '@/events/implements/modules-materials/modules-material-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ModulesMaterialCreatedEvent)
export class ModulesMaterialCreatedHandler
  implements IEventHandler<ModulesMaterialCreatedEvent>
{
  async handle(event: ModulesMaterialCreatedEvent) {
    const { modulesMaterial } = event;
    Logger.log(
      `#${modulesMaterial.id} - created!`,
      ModulesMaterialCreatedHandler.name
    );
    return event;
  }
}
