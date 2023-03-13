import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SortedItemRemovedEvent } from '@/events/implements/sorted-items/sorted-item-removed.event';

@EventsHandler(SortedItemRemovedEvent)
export class SortedItemRemovedHandler
  implements IEventHandler<SortedItemRemovedEvent>
{
  async handle(event: SortedItemRemovedEvent) {
    const { sortedItem } = event;
    Logger.log(`#${sortedItem.id} - removed!`, SortedItemRemovedHandler.name);
    return event;
  }
}
