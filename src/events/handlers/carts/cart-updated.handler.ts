import { CartUpdatedEvent } from '@/events/implements/carts/cart-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CartUpdatedEvent)
export class CartUpdatedHandler implements IEventHandler<CartUpdatedEvent> {
  async handle(event: CartUpdatedEvent) {
    const { cart } = event;
    Logger.log(`#${cart.id} - updated!`, CartUpdatedHandler.name);
    return event;
  }
}
