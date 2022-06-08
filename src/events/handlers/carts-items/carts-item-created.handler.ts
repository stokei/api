import { CartsItemCreatedEvent } from '@/events/implements/carts-items/carts-item-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
