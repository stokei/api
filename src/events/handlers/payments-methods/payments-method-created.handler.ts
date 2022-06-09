import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentsMethodCreatedEvent } from '@/events/implements/payments-methods/payments-method-created.event';

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
