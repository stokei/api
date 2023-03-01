import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CatalogItemRemovedEvent } from '@/events/implements/catalog-items/catalog-item-removed.event';

@EventsHandler(CatalogItemRemovedEvent)
export class CatalogItemRemovedHandler
  implements IEventHandler<CatalogItemRemovedEvent>
{
  async handle(event: CatalogItemRemovedEvent) {
    const { catalogItem } = event;
    Logger.log(`#${catalogItem.id} - removed!`, CatalogItemRemovedHandler.name);
    return event;
  }
}
