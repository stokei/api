import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderChangedToPendingEvent } from '@/events/implements/orders/order-changed-to-pending.event';

@EventsHandler(OrderChangedToPendingEvent)
export class OrderChangedToPendingHandler
  implements IEventHandler<OrderChangedToPendingEvent>
{
  async handle(event: OrderChangedToPendingEvent) {
    const { order } = event;
    Logger.log(
      `#${order.id} - changed to pending!`,
      OrderChangedToPendingHandler.name
    );
    return event;
  }
}
