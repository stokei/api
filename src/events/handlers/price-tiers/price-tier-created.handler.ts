import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PriceTierCreatedEvent } from '@/events/implements/price-tiers/price-tier-created.event';

@EventsHandler(PriceTierCreatedEvent)
export class PriceTierCreatedHandler
  implements IEventHandler<PriceTierCreatedEvent>
{
  async handle(event: PriceTierCreatedEvent) {
    const { priceTier } = event;
    Logger.log(`#${priceTier.id} - created!`, PriceTierCreatedHandler.name);
    return event;
  }
}
