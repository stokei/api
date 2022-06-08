import { CartsItemUpdatedEvent } from '@/events/implements/carts-items/carts-item-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CartsItemUpdatedEvent)
export class CartsItemUpdatedHandler
  implements IEventHandler<CartsItemUpdatedEvent>
{
  async handle(event: CartsItemUpdatedEvent) {
    const { cartsItem } = event;
    Logger.log(`#${cartsItem.id} - updated!`, CartsItemUpdatedHandler.name);
    return event;
  }
}
