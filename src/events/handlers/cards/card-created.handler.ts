import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CardCreatedEvent } from '@/events/implements/cards/card-created.event';

@EventsHandler(CardCreatedEvent)
export class CardCreatedHandler implements IEventHandler<CardCreatedEvent> {
  async handle(event: CardCreatedEvent) {
    const { card } = event;
    Logger.log(`#${card.id} - created!`, CardCreatedHandler.name);
    return event;
  }
}
