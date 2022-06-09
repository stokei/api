import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CheckoutsCurrencyRemovedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-removed.event';

@EventsHandler(CheckoutsCurrencyRemovedEvent)
export class CheckoutsCurrencyRemovedHandler
  implements IEventHandler<CheckoutsCurrencyRemovedEvent>
{
  async handle(event: CheckoutsCurrencyRemovedEvent) {
    const { checkoutsCurrency } = event;
    Logger.log(
      `#${checkoutsCurrency.id} - removed!`,
      CheckoutsCurrencyRemovedHandler.name
    );
    return event;
  }
}
