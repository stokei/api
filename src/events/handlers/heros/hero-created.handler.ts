import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HeroCreatedEvent } from '@/events/implements/heros/hero-created.event';

@EventsHandler(HeroCreatedEvent)
export class HeroCreatedHandler implements IEventHandler<HeroCreatedEvent> {
  async handle(event: HeroCreatedEvent) {
    const { hero } = event;
    Logger.log(`#${hero.id} - created!`, HeroCreatedHandler.name);
    return event;
  }
}
