import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CatalogCreatedEvent } from '@/events/implements/catalogs/catalog-created.event';

@EventsHandler(CatalogCreatedEvent)
export class CatalogCreatedHandler
  implements IEventHandler<CatalogCreatedEvent>
{
  async handle(event: CatalogCreatedEvent) {
    const { catalog } = event;
    Logger.log(`#${catalog.id} - created!`, CatalogCreatedHandler.name);
    return event;
  }
}
