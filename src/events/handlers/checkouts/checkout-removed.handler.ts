import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CheckoutRemovedEvent } from '@/events/implements/checkouts/checkout-removed.event';

@EventsHandler(CheckoutRemovedEvent)
export class CheckoutRemovedHandler
  implements IEventHandler<CheckoutRemovedEvent>
{
  async handle(event: CheckoutRemovedEvent) {
    const { checkout } = event;
    Logger.log(`#${checkout.id} - removed!`, CheckoutRemovedHandler.name);
    return event;
  }
}
