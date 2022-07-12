import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CartItemUpdatedEvent } from '@/events/implements/cart-items/cart-item-updated.event';

@EventsHandler(CartItemUpdatedEvent)
export class CartItemUpdatedHandler
  implements IEventHandler<CartItemUpdatedEvent>
{
  async handle(event: CartItemUpdatedEvent) {
    const { cartItem } = event;
    Logger.log(`#${cartItem.id} - updated!`, CartItemUpdatedHandler.name);
    return event;
  }
}
