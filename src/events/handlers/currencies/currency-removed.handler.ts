import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CurrencyRemovedEvent } from '@/events/implements/currencies/currency-removed.event';

@EventsHandler(CurrencyRemovedEvent)
export class CurrencyRemovedHandler
  implements IEventHandler<CurrencyRemovedEvent>
{
  async handle(event: CurrencyRemovedEvent) {
    const { currency } = event;
    Logger.log(`#${currency.id} - removed!`, CurrencyRemovedHandler.name);
    return event;
  }
}
