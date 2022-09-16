import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { InvoiceCreatedEvent } from '@/events/implements/invoices/invoice-created.event';

@EventsHandler(InvoiceCreatedEvent)
export class InvoiceCreatedHandler
  implements IEventHandler<InvoiceCreatedEvent>
{
  async handle(event: InvoiceCreatedEvent) {
    const { invoice } = event;
    Logger.log(`#${invoice.id} - created!`, InvoiceCreatedHandler.name);
    return event;
  }
}
