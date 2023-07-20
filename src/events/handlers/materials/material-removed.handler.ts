import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MaterialRemovedEvent } from '@/events/implements/materials/material-removed.event';

@EventsHandler(MaterialRemovedEvent)
export class MaterialRemovedHandler
  implements IEventHandler<MaterialRemovedEvent>
{
  async handle(event: MaterialRemovedEvent) {
    const { material } = event;
    Logger.log(`#${material.id} - removed!`, MaterialRemovedHandler.name);
    return event;
  }
}
