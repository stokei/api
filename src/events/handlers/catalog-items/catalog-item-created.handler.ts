import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CatalogItemCreatedEvent } from '@/events/implements/catalog-items/catalog-item-created.event';

@EventsHandler(CatalogItemCreatedEvent)
export class CatalogItemCreatedHandler
  implements IEventHandler<CatalogItemCreatedEvent>
{
  async handle(event: CatalogItemCreatedEvent) {
    const { catalogItem } = event;
    Logger.log(`#${catalogItem.id} - created!`, CatalogItemCreatedHandler.name);
    return event;
  }
}
