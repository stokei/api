import { RatingUpdatedEvent } from '@/events/implements/ratings/rating-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(RatingUpdatedEvent)
export class RatingUpdatedHandler implements IEventHandler<RatingUpdatedEvent> {
  async handle(event: RatingUpdatedEvent) {
    const { rating } = event;
    Logger.log(`#${rating.id} - updated!`, RatingUpdatedHandler.name);
    return event;
  }
}
