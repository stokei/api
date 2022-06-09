import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CheckoutsCurrencyCreatedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-created.event';

@EventsHandler(CheckoutsCurrencyCreatedEvent)
export class CheckoutsCurrencyCreatedHandler
  implements IEventHandler<CheckoutsCurrencyCreatedEvent>
{
  async handle(event: CheckoutsCurrencyCreatedEvent) {
    const { checkoutsCurrency } = event;
    Logger.log(
      `#${checkoutsCurrency.id} - created!`,
      CheckoutsCurrencyCreatedHandler.name
    );
    return event;
  }
}
