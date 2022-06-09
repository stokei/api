import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentRemovedEvent } from '@/events/implements/payments/payment-removed.event';

@EventsHandler(PaymentRemovedEvent)
export class PaymentRemovedHandler
  implements IEventHandler<PaymentRemovedEvent>
{
  async handle(event: PaymentRemovedEvent) {
    const { payment } = event;
    Logger.log(`#${payment.id} - removed!`, PaymentRemovedHandler.name);
    return event;
  }
}
