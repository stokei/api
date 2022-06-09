import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CheckoutsCurrencyUpdatedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-updated.event';

@EventsHandler(CheckoutsCurrencyUpdatedEvent)
export class CheckoutsCurrencyUpdatedHandler
  implements IEventHandler<CheckoutsCurrencyUpdatedEvent>
{
  async handle(event: CheckoutsCurrencyUpdatedEvent) {
    const { checkoutsCurrency } = event;
    Logger.log(
      `#${checkoutsCurrency.id} - updated!`,
      CheckoutsCurrencyUpdatedHandler.name
    );
    return event;
  }
}
