import { CartCreatedEvent } from '@/events/implements/carts/cart-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CartCreatedEvent)
export class CartCreatedHandler implements IEventHandler<CartCreatedEvent> {
  async handle(event: CartCreatedEvent) {
    const { cart } = event;
    Logger.log(`#${cart.id} - created!`, CartCreatedHandler.name);
    return event;
  }
}
