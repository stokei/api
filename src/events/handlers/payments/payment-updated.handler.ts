import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentUpdatedEvent } from '@/events/implements/payments/payment-updated.event';

@EventsHandler(PaymentUpdatedEvent)
export class PaymentUpdatedHandler
  implements IEventHandler<PaymentUpdatedEvent>
{
  async handle(event: PaymentUpdatedEvent) {
    const { payment } = event;
    Logger.log(`#${payment.id} - updated!`, PaymentUpdatedHandler.name);
    return event;
  }
}
