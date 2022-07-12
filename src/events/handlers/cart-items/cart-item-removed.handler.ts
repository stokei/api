import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CartItemRemovedEvent } from '@/events/implements/cart-items/cart-item-removed.event';

@EventsHandler(CartItemRemovedEvent)
export class CartItemRemovedHandler
  implements IEventHandler<CartItemRemovedEvent>
{
  async handle(event: CartItemRemovedEvent) {
    const { cartItem } = event;
    Logger.log(`#${cartItem.id} - removed!`, CartItemRemovedHandler.name);
    return event;
  }
}
