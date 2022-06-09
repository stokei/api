import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PriceUpdatedEvent } from '@/events/implements/prices/price-updated.event';

@EventsHandler(PriceUpdatedEvent)
export class PriceUpdatedHandler implements IEventHandler<PriceUpdatedEvent> {
  async handle(event: PriceUpdatedEvent) {
    const { price } = event;
    Logger.log(`#${price.id} - updated!`, PriceUpdatedHandler.name);
    return event;
  }
}
