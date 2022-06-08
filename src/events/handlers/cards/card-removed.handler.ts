import { CardRemovedEvent } from '@/events/implements/cards/card-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CardRemovedEvent)
export class CardRemovedHandler implements IEventHandler<CardRemovedEvent> {
  async handle(event: CardRemovedEvent) {
    const { card } = event;
    Logger.log(`#${card.id} - removed!`, CardRemovedHandler.name);
    return event;
  }
}
