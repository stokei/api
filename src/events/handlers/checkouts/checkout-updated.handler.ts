import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CheckoutUpdatedEvent } from '@/events/implements/checkouts/checkout-updated.event';

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
