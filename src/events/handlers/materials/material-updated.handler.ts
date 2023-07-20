import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MaterialUpdatedEvent } from '@/events/implements/materials/material-updated.event';

@EventsHandler(MaterialUpdatedEvent)
export class MaterialUpdatedHandler
  implements IEventHandler<MaterialUpdatedEvent>
{
  async handle(event: MaterialUpdatedEvent) {
    const { material } = event;
    Logger.log(`#${material.id} - updated!`, MaterialUpdatedHandler.name);
    return event;
  }
}
