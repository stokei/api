import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';

@EventsHandler(PaymentCreatedEvent)
export class PaymentCreatedHandler
  implements IEventHandler<PaymentCreatedEvent>
{
  async handle(event: PaymentCreatedEvent) {
    const { payment } = event;
    Logger.log(`#${payment.id} - created!`, PaymentCreatedHandler.name);
    return event;
  }
}
