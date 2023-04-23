import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CatalogRemovedEvent } from '@/events/implements/catalogs/catalog-removed.event';

@EventsHandler(CatalogRemovedEvent)
export class CatalogRemovedHandler
  implements IEventHandler<CatalogRemovedEvent>
{
  async handle(event: CatalogRemovedEvent) {
    const { catalog } = event;
    Logger.log(`#${catalog.id} - removed!`, CatalogRemovedHandler.name);
    return event;
  }
}
