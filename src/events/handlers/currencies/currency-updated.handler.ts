import { CurrencyUpdatedEvent } from '@/events/implements/currencies/currency-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
