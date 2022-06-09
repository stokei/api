import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CartsItemCreatedEvent } from '@/events/implements/carts-items/carts-item-created.event';

@EventsHandler(CartsItemCreatedEvent)
export class CartsItemCreatedHandler
  implements IEventHandler<CartsItemCreatedEvent>
{
  async handle(event: CartsItemCreatedEvent) {
    const { cartsItem } = event;
    Logger.log(`#${cartsItem.id} - created!`, CartsItemCreatedHandler.name);
    return event;
  }
}
