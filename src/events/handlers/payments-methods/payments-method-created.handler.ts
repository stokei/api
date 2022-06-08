import { PaymentsMethodCreatedEvent } from '@/events/implements/payments-methods/payments-method-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PaymentsMethodCreatedEvent)
export class PaymentsMethodCreatedHandler
  implements IEventHandler<PaymentsMethodCreatedEvent>
{
  async handle(event: PaymentsMethodCreatedEvent) {
    const { paymentsMethod } = event;
    Logger.log(
      `#${paymentsMethod.id} - created!`,
      PaymentsMethodCreatedHandler.name
    );
    return event;
  }
}
