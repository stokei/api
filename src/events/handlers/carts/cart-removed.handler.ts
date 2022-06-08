import { CartRemovedEvent } from '@/events/implements/carts/cart-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CartRemovedEvent)
export class CartRemovedHandler implements IEventHandler<CartRemovedEvent> {
  async handle(event: CartRemovedEvent) {
    const { cart } = event;
    Logger.log(`#${cart.id} - removed!`, CartRemovedHandler.name);
    return event;
  }
}
