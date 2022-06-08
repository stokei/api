import { CartsItemRemovedEvent } from '@/events/implements/carts-items/carts-item-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CartsItemRemovedEvent)
export class CartsItemRemovedHandler
  implements IEventHandler<CartsItemRemovedEvent>
{
  async handle(event: CartsItemRemovedEvent) {
    const { cartsItem } = event;
    Logger.log(`#${cartsItem.id} - removed!`, CartsItemRemovedHandler.name);
    return event;
  }
}
