import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PriceTierUpdatedEvent } from '@/events/implements/price-tiers/price-tier-updated.event';

@EventsHandler(PriceTierUpdatedEvent)
export class PriceTierUpdatedHandler
  implements IEventHandler<PriceTierUpdatedEvent>
{
  async handle(event: PriceTierUpdatedEvent) {
    const { priceTier } = event;
    Logger.log(`#${priceTier.id} - updated!`, PriceTierUpdatedHandler.name);
    return event;
  }
}
