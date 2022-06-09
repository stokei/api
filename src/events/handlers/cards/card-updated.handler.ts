import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CardUpdatedEvent } from '@/events/implements/cards/card-updated.event';

@EventsHandler(CardUpdatedEvent)
export class CardUpdatedHandler implements IEventHandler<CardUpdatedEvent> {
  async handle(event: CardUpdatedEvent) {
    const { card } = event;
    Logger.log(`#${card.id} - updated!`, CardUpdatedHandler.name);
    return event;
  }
}
