import { PaymentsMethodRemovedEvent } from '@/events/implements/payments-methods/payments-method-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PaymentsMethodRemovedEvent)
export class PaymentsMethodRemovedHandler
  implements IEventHandler<PaymentsMethodRemovedEvent>
{
  async handle(event: PaymentsMethodRemovedEvent) {
    const { paymentsMethod } = event;
    Logger.log(
      `#${paymentsMethod.id} - removed!`,
      PaymentsMethodRemovedHandler.name
    );
    return event;
  }
}
