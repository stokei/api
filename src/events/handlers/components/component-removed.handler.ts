import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ComponentRemovedEvent } from '@/events/implements/components/component-removed.event';

@EventsHandler(ComponentRemovedEvent)
export class ComponentRemovedHandler
  implements IEventHandler<ComponentRemovedEvent>
{
  async handle(event: ComponentRemovedEvent) {
    const { component } = event;
    Logger.log(`#${component.id} - removed!`, ComponentRemovedHandler.name);
    return event;
  }
}
