import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PriceRemovedEvent } from '@/events/implements/prices/price-removed.event';

@EventsHandler(PriceRemovedEvent)
export class PriceRemovedHandler implements IEventHandler<PriceRemovedEvent> {
  async handle(event: PriceRemovedEvent) {
    const { price } = event;
    Logger.log(`#${price.id} - removed!`, PriceRemovedHandler.name);
    return event;
  }
}
