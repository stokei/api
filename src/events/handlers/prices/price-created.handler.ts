import { PriceCreatedEvent } from '@/events/implements/prices/price-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PriceCreatedEvent)
export class PriceCreatedHandler implements IEventHandler<PriceCreatedEvent> {
  async handle(event: PriceCreatedEvent) {
    const { price } = event;
    Logger.log(`#${price.id} - created!`, PriceCreatedHandler.name);
    return event;
  }
}
