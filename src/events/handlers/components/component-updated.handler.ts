import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ComponentUpdatedEvent } from '@/events/implements/components/component-updated.event';

@EventsHandler(ComponentUpdatedEvent)
export class ComponentUpdatedHandler
  implements IEventHandler<ComponentUpdatedEvent>
{
  async handle(event: ComponentUpdatedEvent) {
    const { component } = event;
    Logger.log(`#${component.id} - updated!`, ComponentUpdatedHandler.name);
    return event;
  }
}
