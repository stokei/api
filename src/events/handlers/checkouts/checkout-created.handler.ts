import { CheckoutCreatedEvent } from '@/events/implements/checkouts/checkout-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CheckoutCreatedEvent)
export class CheckoutCreatedHandler
  implements IEventHandler<CheckoutCreatedEvent>
{
  async handle(event: CheckoutCreatedEvent) {
    const { checkout } = event;
    Logger.log(`#${checkout.id} - created!`, CheckoutCreatedHandler.name);
    return event;
  }
}
