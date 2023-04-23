import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PriceDeactivatedEvent } from '@/events/implements/prices/price-deactivated.event';

@EventsHandler(PriceDeactivatedEvent)
export class PriceDeactivatedHandler
  implements IEventHandler<PriceDeactivatedEvent>
{
  async handle(event: PriceDeactivatedEvent) {
    const { price } = event;
    Logger.log(`#${price.id} - deactivated!`, PriceDeactivatedHandler.name);
    return event;
  }
}
