import { CheckoutUpdatedEvent } from '@/events/implements/checkouts/checkout-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CheckoutUpdatedEvent)
export class CheckoutUpdatedHandler
  implements IEventHandler<CheckoutUpdatedEvent>
{
  async handle(event: CheckoutUpdatedEvent) {
    const { checkout } = event;
    Logger.log(`#${checkout.id} - updated!`, CheckoutUpdatedHandler.name);
    return event;
  }
}
