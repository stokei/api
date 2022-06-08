import { RatingCreatedEvent } from '@/events/implements/ratings/rating-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(RatingCreatedEvent)
export class RatingCreatedHandler implements IEventHandler<RatingCreatedEvent> {
  async handle(event: RatingCreatedEvent) {
    const { rating } = event;
    Logger.log(`#${rating.id} - created!`, RatingCreatedHandler.name);
    return event;
  }
}
