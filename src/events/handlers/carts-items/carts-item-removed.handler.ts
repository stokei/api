import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CartsItemRemovedEvent } from '@/events/implements/carts-items/carts-item-removed.event';

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
