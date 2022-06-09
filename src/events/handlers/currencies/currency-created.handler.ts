import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CurrencyCreatedEvent } from '@/events/implements/currencies/currency-created.event';

@EventsHandler(CurrencyCreatedEvent)
export class CurrencyCreatedHandler
  implements IEventHandler<CurrencyCreatedEvent>
{
  async handle(event: CurrencyCreatedEvent) {
    const { currency } = event;
    Logger.log(`#${currency.id} - created!`, CurrencyCreatedHandler.name);
    return event;
  }
}
