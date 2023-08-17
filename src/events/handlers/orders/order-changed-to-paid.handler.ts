import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderChangedToPaidEvent } from '@/events/implements/orders/order-changed-to-paid.event';

@EventsHandler(OrderChangedToPaidEvent)
export class OrderChangedToPaidHandler
  implements IEventHandler<OrderChangedToPaidEvent>
{
  async handle(event: OrderChangedToPaidEvent) {
    const { order } = event;
    Logger.log(
      `#${order.id} - changed to paid!`,
      OrderChangedToPaidHandler.name
    );
    return event;
  }
}
