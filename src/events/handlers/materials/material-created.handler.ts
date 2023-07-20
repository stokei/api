import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MaterialCreatedEvent } from '@/events/implements/materials/material-created.event';

@EventsHandler(MaterialCreatedEvent)
export class MaterialCreatedHandler
  implements IEventHandler<MaterialCreatedEvent>
{
  async handle(event: MaterialCreatedEvent) {
    const { material } = event;
    Logger.log(`#${material.id} - created!`, MaterialCreatedHandler.name);
    return event;
  }
}
