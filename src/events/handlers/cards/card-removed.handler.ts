import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CardRemovedEvent } from '@/events/implements/cards/card-removed.event';

@EventsHandler(CardRemovedEvent)
export class CardRemovedHandler implements IEventHandler<CardRemovedEvent> {
  async handle(event: CardRemovedEvent) {
    const { card } = event;
    Logger.log(`#${card.id} - removed!`, CardRemovedHandler.name);
    return event;
  }
}
