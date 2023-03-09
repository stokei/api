import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HeroUpdatedEvent } from '@/events/implements/heros/hero-updated.event';

@EventsHandler(HeroUpdatedEvent)
export class HeroUpdatedHandler implements IEventHandler<HeroUpdatedEvent> {
  async handle(event: HeroUpdatedEvent) {
    const { hero } = event;
    Logger.log(`#${hero.id} - updated!`, HeroUpdatedHandler.name);
    return event;
  }
}
