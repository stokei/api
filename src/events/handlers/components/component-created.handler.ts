import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ComponentCreatedEvent } from '@/events/implements/components/component-created.event';

@EventsHandler(ComponentCreatedEvent)
export class ComponentCreatedHandler
  implements IEventHandler<ComponentCreatedEvent>
{
  async handle(event: ComponentCreatedEvent) {
    const { component } = event;
    Logger.log(`#${component.id} - created!`, ComponentCreatedHandler.name);
    return event;
  }
}
