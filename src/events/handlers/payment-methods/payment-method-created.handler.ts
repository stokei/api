import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentMethodCreatedEvent } from '@/events/implements/payment-methods/payment-method-created.event';

@EventsHandler(PaymentMethodCreatedEvent)
export class PaymentMethodCreatedHandler
  implements IEventHandler<PaymentMethodCreatedEvent>
{
  async handle(event: PaymentMethodCreatedEvent) {
    const { paymentMethod } = event;
    Logger.log(
      `#${paymentMethod.id} - created!`,
      PaymentMethodCreatedHandler.name
    );
    return event;
  }
}
