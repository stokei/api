import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentChangedToPaidEvent } from '@/events/implements/payments/payment-changed-to-paid.event';

@EventsHandler(PaymentChangedToPaidEvent)
export class PaymentChangedToPaidHandler
  implements IEventHandler<PaymentChangedToPaidEvent>
{
  async handle(event: PaymentChangedToPaidEvent) {
    const { payment } = event;
    Logger.log(
      `#${payment.id} - changed to paid!`,
      PaymentChangedToPaidHandler.name
    );
    return event;
  }
}
