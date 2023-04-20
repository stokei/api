import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PriceActivatedEvent } from '@/events/implements/prices/price-activated.event';

@EventsHandler(PriceActivatedEvent)
export class PriceActivatedHandler
  implements IEventHandler<PriceActivatedEvent>
{
  async handle(event: PriceActivatedEvent) {
    const { price } = event;
    Logger.log(`#${price.id} - activated!`, PriceActivatedHandler.name);
    return event;
  }
}
