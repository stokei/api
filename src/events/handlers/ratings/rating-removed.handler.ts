import { RatingRemovedEvent } from '@/events/implements/ratings/rating-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(RatingRemovedEvent)
export class RatingRemovedHandler implements IEventHandler<RatingRemovedEvent> {
  async handle(event: RatingRemovedEvent) {
    const { rating } = event;
    Logger.log(`#${rating.id} - removed!`, RatingRemovedHandler.name);
    return event;
  }
}
