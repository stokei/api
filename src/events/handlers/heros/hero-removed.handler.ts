import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HeroRemovedEvent } from '@/events/implements/heros/hero-removed.event';

@EventsHandler(HeroRemovedEvent)
export class HeroRemovedHandler implements IEventHandler<HeroRemovedEvent> {
  async handle(event: HeroRemovedEvent) {
    const { hero } = event;
    Logger.log(`#${hero.id} - removed!`, HeroRemovedHandler.name);
    return event;
  }
}
