import { PaymentsMethodUpdatedEvent } from '@/events/implements/payments-methods/payments-method-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PaymentsMethodUpdatedEvent)
export class PaymentsMethodUpdatedHandler
  implements IEventHandler<PaymentsMethodUpdatedEvent>
{
  async handle(event: PaymentsMethodUpdatedEvent) {
    const { paymentsMethod } = event;
    Logger.log(
      `#${paymentsMethod.id} - updated!`,
      PaymentsMethodUpdatedHandler.name
    );
    return event;
  }
}
