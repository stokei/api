import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentsMethodRemovedEvent } from '@/events/implements/payments-methods/payments-method-removed.event';

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
