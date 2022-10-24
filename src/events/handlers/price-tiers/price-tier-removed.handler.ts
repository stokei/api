import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PriceTierRemovedEvent } from '@/events/implements/price-tiers/price-tier-removed.event';

@EventsHandler(PriceTierRemovedEvent)
export class PriceTierRemovedHandler
  implements IEventHandler<PriceTierRemovedEvent>
{
  async handle(event: PriceTierRemovedEvent) {
    const { priceTier } = event;
    Logger.log(`#${priceTier.id} - removed!`, PriceTierRemovedHandler.name);
    return event;
  }
}
