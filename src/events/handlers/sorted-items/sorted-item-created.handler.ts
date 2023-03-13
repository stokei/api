import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SortedItemCreatedEvent } from '@/events/implements/sorted-items/sorted-item-created.event';

@EventsHandler(SortedItemCreatedEvent)
export class SortedItemCreatedHandler
  implements IEventHandler<SortedItemCreatedEvent>
{
  async handle(event: SortedItemCreatedEvent) {
    const { sortedItem } = event;
    Logger.log(`#${sortedItem.id} - created!`, SortedItemCreatedHandler.name);
    return event;
  }
}
