import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
