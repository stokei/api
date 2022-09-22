import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { InvoiceChangedToPaymentErrorEvent } from '@/events/implements/invoices/invoice-changed-to-payment-error.event';

@EventsHandler(InvoiceChangedToPaymentErrorEvent)
export class InvoiceChangedToPaymentErrorHandler
  implements IEventHandler<InvoiceChangedToPaymentErrorEvent>
{
  async handle(event: InvoiceChangedToPaymentErrorEvent) {
    const { invoice } = event;
    Logger.log(
      `#${invoice.id} - changed to payment error!`,
      InvoiceChangedToPaymentErrorHandler.name
    );
    return event;
  }
}
