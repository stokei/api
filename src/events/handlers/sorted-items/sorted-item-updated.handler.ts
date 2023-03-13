import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SortedItemUpdatedEvent } from '@/events/implements/sorted-items/sorted-item-updated.event';

@EventsHandler(SortedItemUpdatedEvent)
export class SortedItemUpdatedHandler
  implements IEventHandler<SortedItemUpdatedEvent>
{
  async handle(event: SortedItemUpdatedEvent) {
    const { sortedItem } = event;
    Logger.log(`#${sortedItem.id} - updated!`, SortedItemUpdatedHandler.name);
    return event;
  }
}
