import { CardUpdatedEvent } from '@/events/implements/cards/card-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CardUpdatedEvent)
export class CardUpdatedHandler implements IEventHandler<CardUpdatedEvent> {
  async handle(event: CardUpdatedEvent) {
    const { card } = event;
    Logger.log(`#${card.id} - updated!`, CardUpdatedHandler.name);
    return event;
  }
}
