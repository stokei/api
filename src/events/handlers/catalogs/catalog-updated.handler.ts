import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CatalogUpdatedEvent } from '@/events/implements/catalogs/catalog-updated.event';

@EventsHandler(CatalogUpdatedEvent)
export class CatalogUpdatedHandler
  implements IEventHandler<CatalogUpdatedEvent>
{
  async handle(event: CatalogUpdatedEvent) {
    const { catalog } = event;
    Logger.log(`#${catalog.id} - updated!`, CatalogUpdatedHandler.name);
    return event;
  }
}
