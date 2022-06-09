import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CurrencyUpdatedEvent } from '@/events/implements/currencies/currency-updated.event';

@EventsHandler(CurrencyUpdatedEvent)
export class CurrencyUpdatedHandler
  implements IEventHandler<CurrencyUpdatedEvent>
{
  async handle(event: CurrencyUpdatedEvent) {
    const { currency } = event;
    Logger.log(`#${currency.id} - updated!`, CurrencyUpdatedHandler.name);
    return event;
  }
}
