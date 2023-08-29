import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentMethodUpdatedEvent } from '@/events/implements/payment-methods/payment-method-updated.event';

@EventsHandler(PaymentMethodUpdatedEvent)
export class PaymentMethodUpdatedHandler
  implements IEventHandler<PaymentMethodUpdatedEvent>
{
  async handle(event: PaymentMethodUpdatedEvent) {
    const { paymentMethod } = event;
    Logger.log(
      `#${paymentMethod.id} - updated!`,
      PaymentMethodUpdatedHandler.name
    );
    return event;
  }
}
