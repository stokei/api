import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RatingCreatedEvent } from '@/events/implements/ratings/rating-created.event';

@EventsHandler(RatingCreatedEvent)
export class RatingCreatedHandler implements IEventHandler<RatingCreatedEvent> {
  async handle(event: RatingCreatedEvent) {
    const { rating } = event;
    Logger.log(`#${rating.id} - created!`, RatingCreatedHandler.name);
    return event;
  }
}
