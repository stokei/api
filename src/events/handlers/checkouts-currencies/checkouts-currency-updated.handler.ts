import { CheckoutsCurrencyUpdatedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
