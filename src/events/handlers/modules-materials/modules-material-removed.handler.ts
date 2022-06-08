import { ModulesMaterialRemovedEvent } from '@/events/implements/modules-materials/modules-material-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ModulesMaterialRemovedEvent)
export class ModulesMaterialRemovedHandler
  implements IEventHandler<ModulesMaterialRemovedEvent>
{
  async handle(event: ModulesMaterialRemovedEvent) {
    const { modulesMaterial } = event;
    Logger.log(
      `#${modulesMaterial.id} - removed!`,
      ModulesMaterialRemovedHandler.name
    );
    return event;
  }
}
