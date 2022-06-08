import { CheckoutRemovedEvent } from '@/events/implements/checkouts/checkout-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
