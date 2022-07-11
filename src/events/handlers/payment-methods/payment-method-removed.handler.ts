import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentMethodRemovedEvent } from '@/events/implements/payment-methods/payment-method-removed.event';

@EventsHandler(PaymentMethodRemovedEvent)
export class PaymentMethodRemovedHandler
  implements IEventHandler<PaymentMethodRemovedEvent>
{
  async handle(event: PaymentMethodRemovedEvent) {
    const { paymentMethod } = event;
    Logger.log(
      `#${paymentMethod.id} - removed!`,
      PaymentMethodRemovedHandler.name
    );
    return event;
  }
}
