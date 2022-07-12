import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CartItemCreatedEvent } from '@/events/implements/cart-items/cart-item-created.event';

@EventsHandler(CartItemCreatedEvent)
export class CartItemCreatedHandler
  implements IEventHandler<CartItemCreatedEvent>
{
  async handle(event: CartItemCreatedEvent) {
    const { cartItem } = event;
    Logger.log(`#${cartItem.id} - created!`, CartItemCreatedHandler.name);
    return event;
  }
}
