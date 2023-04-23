import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { InvoiceChangedToPaidEvent } from '@/events/implements/invoices/invoice-changed-to-paid.event';

@EventsHandler(InvoiceChangedToPaidEvent)
export class InvoiceChangedToPaidHandler
  implements IEventHandler<InvoiceChangedToPaidEvent>
{
  async handle(event: InvoiceChangedToPaidEvent) {
    const { invoice } = event;
    Logger.log(
      `#${invoice.id} - changed to paid!`,
      InvoiceChangedToPaidHandler.name
    );
    return event;
  }
}
