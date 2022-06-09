import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CartUpdatedEvent } from '@/events/implements/carts/cart-updated.event';

@EventsHandler(CartUpdatedEvent)
export class CartUpdatedHandler implements IEventHandler<CartUpdatedEvent> {
  async handle(event: CartUpdatedEvent) {
    const { cart } = event;
    Logger.log(`#${cart.id} - updated!`, CartUpdatedHandler.name);
    return event;
  }
}
